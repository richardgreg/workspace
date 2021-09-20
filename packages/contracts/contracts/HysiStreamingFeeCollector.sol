// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/math/Math.sol";
import "./lib/Owned.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "./Interfaces/Integrations/Curve3Pool.sol";
import "./Interfaces/Integrations/ISetToken.sol";
import "./HysiBatchInteraction.sol";
import "./KeeperIncentive.sol";

contract HysiStreamingFeeCollector is Owned, KeeperIncentive {
  using SafeMath for uint256;
  using SafeERC20 for ISetToken;
  using SafeERC20 for IERC20;

  /* ========== STATE VARIABLES ========== */

  HysiBatchInteraction public hysiBatchInteraction;
  Curve3Pool public curve3Pool;
  IUniswapV2Router02 public uniswapRouter;
  ISetToken public hysi;
  IERC20 public threeCrv;
  IERC20[3] public stables;
  address public rewardsManager;

  uint256 public requiredMinPop;

  /* ========== EVENTS ========== */

  event DepositedHysi(uint256 balance);
  event SendRewardsFromHysi(uint256 rewards);
  event RequiredMinPopUpdated(uint256 amount);

  /* ========== CONSTRUCTOR ========== */

  constructor(
    HysiBatchInteraction _hysiBatchInteraction,
    Curve3Pool _curve3Pool,
    IUniswapV2Router02 _uniswapRouter,
    ISetToken _hysi,
    IERC20 _pop,
    IERC20 _threeCrv,
    IERC20[3] memory _stables,
    address _rewardsManager,
    address _governance
  ) Owned(msg.sender) KeeperIncentive(_governance, _pop) {
    hysiBatchInteraction = _hysiBatchInteraction;
    curve3Pool = _curve3Pool;
    uniswapRouter = _uniswapRouter;
    hysi = _hysi;
    threeCrv = _threeCrv;
    stables = _stables;
    rewardsManager = _rewardsManager;
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  receive() external payable {}

  function depositHysiForRedeem() external {
    uint256 balance = hysi.balanceOf(address(this));
    hysiBatchInteraction.depositForMint(balance);
    emit DepositedHysi(balance);
  }

  function claimHysiConvertIntoPopAndSendAsRewards(
    bytes32[] memory batchIds,
    uint8 stableIndex,
    uint256 minStableAmount,
    uint256 minPopAmount,
    uint256 swapTimeOut,
    address[] memory path
  ) external keeperIncentive(0) {
    require(minPopAmount >= requiredMinPop, "this will not return enough pop");
    require(
      path[0] == address(stables[stableIndex]) &&
        path[path.length] == address(POP),
      "swap path is not correct"
    );
    require(batchIds.length <= 10, "this might lead to a gas overflow");

    for (uint8 i; i < batchIds.length; i++) {
      hysiBatchInteraction.claim(batchIds[i]);
    }
    _swapHysiIntoPopAndSendAsReward(
      stableIndex,
      minStableAmount,
      minPopAmount,
      swapTimeOut,
      path
    );
  }

  /* ========== RESTRICTED FUNCTIONS ========== */

  function _swapHysiIntoPopAndSendAsReward(
    uint8 stableIndex,
    uint256 minStableAmount,
    uint256 minPopAmount,
    uint256 swapTimeOut,
    address[] memory path
  ) internal {
    curve3Pool.remove_liquidity_one_coin(
      threeCrv.balanceOf(address(this)),
      stableIndex,
      minStableAmount
    );

    uint256 stableBalance = stables[stableIndex].balanceOf(address(this));
    stables[stableIndex].safeIncreaseAllowance(
      address(uniswapRouter),
      stableBalance
    );
    uint256[] memory _amounts = uniswapRouter.swapExactTokensForTokens(
      stableBalance,
      minPopAmount,
      path,
      address(this),
      block.timestamp.add(swapTimeOut)
    );
    POP.safeTransfer(rewardsManager, _amounts[1]);
    emit SendRewardsFromHysi(_amounts[1]);
  }

  /* ========== SETTER ========== */

  function setRequiredMinPop(uint256 _requiredMinPop) external onlyOwner {
    requiredMinPop = _requiredMinPop;
    emit RequiredMinPopUpdated(_requiredMinPop);
  }

  function setRewardsManager(address _rewardsManager) external onlyOwner {
    rewardsManager = _rewardsManager;
  }

  function setHysiBatchInteraction(HysiBatchInteraction _hysiBatchInteraction)
    external
    onlyOwner
  {
    hysiBatchInteraction = _hysiBatchInteraction;
  }

  function setCurve3Pool(Curve3Pool _curve3Pool) external onlyOwner {
    curve3Pool = _curve3Pool;
  }

  function setUniswapRouter(IUniswapV2Router02 _uniswapRouter)
    external
    onlyOwner
  {
    uniswapRouter = _uniswapRouter;
  }
}
