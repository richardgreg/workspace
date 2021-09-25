pragma solidity ^0.6.10;
pragma experimental "ABIEncoderV2";

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/SafeCast.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import {Invoke} from "@setprotocol/set-protocol-v2/contracts/protocol/lib/Invoke.sol";
import {ISetToken} from "@setprotocol/set-protocol-v2/contracts/interfaces/ISetToken.sol";
import {IController} from "@setprotocol/set-protocol-v2/contracts/interfaces/IController.sol";
import {IExchangeAdapter} from "@setprotocol/set-protocol-v2/contracts/interfaces/IExchangeAdapter.sol";
import {ModuleBase} from "@setprotocol/set-protocol-v2/contracts/protocol/lib/ModuleBase.sol";
import {Position} from "@setprotocol/set-protocol-v2/contracts/protocol/lib/Position.sol";
import {PreciseUnitMath} from "@setprotocol/set-protocol-v2/contracts/lib/PreciseUnitMath.sol";
import {YearnVault} from "./Interfaces/Integrations/YearnVault.sol";
import {CurveMetapool} from "./Interfaces/Integrations/CurveMetapool.sol";

/**
 * @title Rebalance Module
 * @author popcorn.network
 *
 *  Module that rebalances HYSI. It will replace the specified components with other components with equal weight
 */
contract HysiRebalancer is ModuleBase, ReentrancyGuard {
  using SafeCast for int256;
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  using Invoke for ISetToken;
  using Position for ISetToken;
  using PreciseUnitMath for uint256;

  /* ============ Struct ============ */

  /**
   * @param curveMetaPool A CurveMetaPool for trading an exotic stablecoin against 3CRV
   * @param crvLPToken The LP-Token of the CurveMetapool
   */
  struct CurvePoolTokenPair {
    CurveMetapool curveMetaPool;
    IERC20 crvLPToken;
  }

  /* ============ Events ============ */

  /* ============ Constants ============ */

  /* ========== STATE VARIABLES ========== */

  ISetToken public setToken;
  IERC20 public threeCrv;
  mapping(address => CurvePoolTokenPair) public curvePoolTokenPairs;

  /* ============ Constructor ============ */

  constructor(IController _controller) public ModuleBase(_controller) {}

  /* ============ External Functions ============ */

  /**
   * Initializes this module to the SetToken. Only callable by the SetToken's manager.
   *
   * @param _setToken                 Instance of the SetToken to initialize
   */
  function initialize(
    ISetToken _setToken,
    IERC20 _threeCrv,
    address[] memory _components,
    CurvePoolTokenPair[] memory _curvePoolTokenPairs
  )
    external
    onlyValidAndPendingSet(_setToken)
    onlySetManager(_setToken, msg.sender)
  {
    _setToken.initializeModule();
    setToken = _setToken;
    threeCrv = _threeCrv;
    _setCurvePoolTokenPairs(_components, _curvePoolTokenPairs);
  }

  /**
   * todo: set slippage parameter for wrapping 3crv
   */
  function rebalance(
    ISetToken _setToken,
    address[] memory _componentsOld,
    address[] memory _componentsNew,
    CurvePoolTokenPair[] memory _curvePoolTokenPairs,
    uint256 _min3CrvToReceive
  ) external onlySetManager(_setToken, msg.sender) {
    _setCurvePoolTokenPairs(_componentsNew, _curvePoolTokenPairs);
    uint256 setTotalSupply = setToken.totalSupply();

    for (uint256 i = 0; i < _componentsOld.length; i++) {
      address component = _componentsNew[i];

      uint256 componentBalance = IERC20(component).balanceOf(address(setToken));

      // convert components to 3crv
      _unwrapComponent(component, componentBalance);

      // update set token
      setToken.calculateAndEditDefaultPosition(
        component,
        setTotalSupply,
        componentBalance
      );
    }

    uint256 currentBalance = threeCrv.balanceOf(address(this));
    require(currentBalance >= _min3CrvToReceive, "slippage too high");

    for (uint256 i = 0; i < _componentsNew.length; i++) {
      address component = _componentsNew[i];
      uint256 previousComponentBalance = IERC20(component).balanceOf(
        address(setToken)
      );
      uint256 amountToDeposit = currentBalance.div(
        uint256(_componentsNew.length)
      );

      uint256 componentBalance = _wrapComponent(component, amountToDeposit);
      IERC20(component).safeTransfer(address(setToken), componentBalance);

      setToken.calculateAndEditDefaultPosition(
        component,
        setTotalSupply,
        componentBalance
      );
    }
  }

  /**
   * @dev Removes this module from the SetToken, via call by the SetToken. Left with empty logic
   * here because there are no check needed to verify removal.
   */
  function removeModule() external override {}

  /* ============ Internal Functions ============ */
  function _wrapComponent(address _component, uint256 _amountToDeposit)
    internal
    returns (uint256)
  {
    _depositToCurve(
      _amountToDeposit,
      curvePoolTokenPairs[_component].curveMetaPool
    );

    uint256 crvLPTokenBalance = curvePoolTokenPairs[_component]
      .crvLPToken
      .balanceOf(address(this));

    uint256 yTokenBalance = _depositToYearn(
      crvLPTokenBalance,
      curvePoolTokenPairs[_component].crvLPToken,
      YearnVault(_component)
    );
    return yTokenBalance;
  }

  function _unwrapComponent(address _component, uint256 _amount) internal {
    //Deposit yToken to receive crvLPToken
    _withdrawFromYearn(_amount, YearnVault(_component));

    uint256 crvLPTokenBalance = curvePoolTokenPairs[_component]
      .crvLPToken
      .balanceOf(address(this));

    //Deposit crvLPToken to receive 3CRV
    _withdrawFromCurve(
      crvLPTokenBalance,
      curvePoolTokenPairs[_component].crvLPToken,
      curvePoolTokenPairs[_component].curveMetaPool
    );
  }

  /**
   * @notice Deposits crvLPToken for yToken
   * @param _amount The amount of crvLPToken that get deposited
   * @param _crvLPToken The crvLPToken which we deposit
   * @param _yearnVault The yearn Vault in which we deposit
   */
  function _depositToYearn(
    uint256 _amount,
    IERC20 _crvLPToken,
    YearnVault _yearnVault
  ) internal returns (uint256) {
    _crvLPToken.safeDecreaseAllowance(
      address(_yearnVault),
      _crvLPToken.allowance(address(this), address(_yearnVault))
    );
    _crvLPToken.safeIncreaseAllowance(address(_yearnVault), _amount);

    //Mints yToken and sends them to msg.sender (this contract)
    _yearnVault.deposit(_amount);

    return _yearnVault.balanceOf(address(this));
  }

  /**
   * @notice Deposit 3CRV in a curve metapool for its LP-Token
   * @param _amount The amount of 3CRV that gets deposited
   * @param _curveMetapool The metapool where we want to provide liquidity
   */
  function _depositToCurve(uint256 _amount, CurveMetapool _curveMetapool)
    internal
    returns (uint256)
  {
    threeCrv.safeApprove(address(_curveMetapool), 0);
    threeCrv.safeApprove(address(_curveMetapool), uint256(-1));

    //Takes 3CRV and sends lpToken to this contract
    //Metapools take an array of amounts with the exoctic stablecoin at the first spot and 3CRV at the second.
    //The second variable determines the min amount of LP-Token we want to receive (slippage control)
    _curveMetapool.add_liquidity([0, _amount], 0);
  }

  /**
   * @notice Withdraw crvLPToken from yearn
   * @param _amount The amount of crvLPToken which we deposit
   * @param _yearnVault The yearn Vault in which we deposit
   */
  function _withdrawFromYearn(uint256 _amount, YearnVault _yearnVault)
    internal
  {
    setToken.invokeApprove(address(_yearnVault), address(this), 0);
    setToken.invokeApprove(address(_yearnVault), address(this), uint256(-1));

    //Takes yToken and sends crvLPToken to this contract
    _yearnVault.withdraw(_amount);
  }

  /**
   * @notice Withdraws 3CRV for deposited crvLPToken
   * @param _amount The amount of crvLPToken that get deposited
   * @param _lpToken Which crvLPToken we deposit
   * @param _curveMetapool The metapool where we want to provide liquidity
   */
  function _withdrawFromCurve(
    uint256 _amount,
    IERC20 _lpToken,
    CurveMetapool _curveMetapool
  ) internal returns (uint256) {
    _lpToken.safeApprove(address(_curveMetapool), 0);
    _lpToken.safeApprove(address(_curveMetapool), uint256(-1));

    //Takes lp Token and sends 3CRV to this contract
    //The second variable is the index for the token we want to receive (0 = exotic stablecoin, 1 = 3CRV)
    //The third variable determines min amount of token we want to receive (slippage control)
    _curveMetapool.remove_liquidity_one_coin(_amount, 1, 0);
  }

  /**
   * @notice This function defines which underlying token and pools are needed to mint a hysi token
   * @param yTokenAddresses_ An array of addresses for the yToken needed to mint HYSI
   * @param curvePoolTokenPairs_ An array structs describing underlying yToken, crvToken and curve metapool
   * @dev since our calculations for minting just iterate through the index and match it with the quantities given by Set
   * @dev we must make sure to align them correctly by index, otherwise our whole calculation breaks down
   */
  function _setCurvePoolTokenPairs(
    address[] memory yTokenAddresses_,
    CurvePoolTokenPair[] memory curvePoolTokenPairs_
  ) internal {
    for (uint256 i; i < yTokenAddresses_.length; i++) {
      curvePoolTokenPairs[yTokenAddresses_[i]] = curvePoolTokenPairs_[i];
    }
  }
}
