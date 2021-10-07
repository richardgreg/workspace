// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "../interfaces/IRegion.sol";
import "../interfaces/IBeneficiaryVaults.sol";
import "../interfaces/IBeneficiaryRegistry.sol";
import "../interfaces/IACLRegistry.sol";

contract BeneficiaryVaults is IBeneficiaryVaults, ReentrancyGuard {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  enum VaultStatus {
    Open,
    Closed
  }

  enum ElectionTerm {
    Monthly,
    Quarterly,
    Yearly
  }

  struct Vault {
    uint256 totalAllocated;
    uint256 currentBalance;
    uint256 unclaimedShare;
    mapping(address => bool) claimed;
    bytes32 merkleRoot;
    VaultStatus status;
    ElectionTerm term;
  }

  /* ========== STATE VARIABLES ========== */

  IERC20 public immutable pop;
  IACLRegistry public aclRegistry;
  IBeneficiaryRegistry public beneficiaryRegistry;
  uint256 public totalDistributedBalance = 0;
  mapping(uint256 => Vault) public vaults;
  uint256[3] public override activeVaults;

  /* ========== EVENTS ========== */

  event VaultOpened(uint256 vaultId, uint8 electionTerm, bytes32 merkleRoot);
  event VaultClosed(uint256 vaultId);
  event RewardsAllocated(uint256 amount);
  event RewardClaimed(uint256 vaultId, address beneficiary, uint256 amount);
  event BeneficiaryRegistryChanged(
    IBeneficiaryRegistry from,
    IBeneficiaryRegistry to
  );

  /* ========== CONSTRUCTOR ========== */

  constructor(IERC20 pop_, IACLRegistry aclRegistry_) {
    pop = pop_;
    aclRegistry = aclRegistry_;
  }

  /* ========== VIEWS ========== */

  function getVault(uint256 vaultId_)
    public
    view
    returns (
      uint256 totalAllocated,
      uint256 currentBalance,
      uint256 unclaimedShare,
      bytes32 merkleRoot,
      VaultStatus status,
      ElectionTerm term
    )
  {
    Vault storage vault = vaults[vaultId_];
    totalAllocated = vault.totalAllocated;
    currentBalance = vault.currentBalance;
    unclaimedShare = vault.unclaimedShare;
    merkleRoot = vault.merkleRoot;
    status = vault.status;
    term = vault.term;
  }

  function hasClaimed(uint256 vaultId_, address beneficiary_)
    public
    view
    returns (bool)
  {
    return vaults[vaultId_].claimed[beneficiary_];
  }

  function vaultCanBeClosed(uint8 term) public view override returns (bool) {
    uint256 vaultId = activeVaults[term];
    return
      uint8(vaults[vaultId].term) == term &&
      vaults[vaultId].status == VaultStatus.Open;
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  /**
   * @notice Initializes a vault for beneficiary claims
   * @param vaultId_ Vault ID in range 0-2
   * @param electionTerm_ election term of the grant. used to set the vaultId_ on the right slot in activeVaults
   * @param merkleRoot_ Merkle root to support claims
   * @dev Vault cannot be initialized if it is currently in an open state, otherwise existing data is reset*
   */
  function openVault(
    uint256 vaultId_,
    uint8 electionTerm_,
    bytes32 merkleRoot_
  ) public override onlyOwner {
    require(
      vaults[vaultId_].merkleRoot == "" ||
        vaults[vaultId_].status == VaultStatus.Closed,
      "Vault must not be open"
    );

    Vault storage vault = vaults[vaultId_];
    vault.totalAllocated = 0;
    vault.currentBalance = 0;
    vault.unclaimedShare = 100e18;
    vault.merkleRoot = merkleRoot_;
    vault.status = VaultStatus.Open;
    vault.term = ElectionTerm(electionTerm_);

    activeVaults[electionTerm_] = vaultId_;

    emit VaultOpened(vaultId_, electionTerm_, merkleRoot_);
  }

  /**
   * @notice Close an open vault
   * @dev Vault must be in an open state
   * @param vaultId_ Vault ID in range 0-2
   */
  function closeVault(uint256 vaultId_) public override onlyOwner {
    Vault storage vault = vaults[vaultId_];
    require(vault.status == VaultStatus.Open, "Vault must be open");

    vault.status = VaultStatus.Closed;

    emit VaultClosed(vaultId_);
  }

  /**
   * @notice Verifies a valid claim with no cost
   * @param vaultId_ Vault ID in range 0-2
   * @param proof_ Merkle proof of path to leaf element
   * @param beneficiary_ Beneficiary address encoded in leaf element
   * @param share_ Beneficiary expected share encoded in leaf element
   * @return Returns boolean true or false if claim is valid
   */
  function verifyClaim(
    uint256 vaultId_,
    bytes32[] memory proof_,
    address beneficiary_,
    uint256 share_
  ) public view returns (bool) {
    require(msg.sender == beneficiary_, "Sender must be beneficiary");
    require(vaults[vaultId_].status == VaultStatus.Open, "Vault must be open");
    require(
      beneficiaryRegistry.beneficiaryExists(beneficiary_) == true,
      "Beneficiary does not exist"
    );

    return
      MerkleProof.verify(
        proof_,
        vaults[vaultId_].merkleRoot,
        bytes32(keccak256(abi.encodePacked(beneficiary_, share_)))
      );
  }

  /**
   * @notice Transfers POP tokens only once to beneficiary on successful claim
   * @dev Applies any outstanding rewards before processing claim
   * @param vaultId_ Vault ID in range 0-2
   * @param proof_ Merkle proof of path to leaf element
   * @param beneficiary_ Beneficiary address encoded in leaf element
   * @param share_ Beneficiary expected share encoded in leaf element
   */
  function claimReward(
    uint256 vaultId_,
    bytes32[] memory proof_,
    address beneficiary_,
    uint256 share_
  ) public nonReentrant {
    require(
      verifyClaim(vaultId_, proof_, beneficiary_, share_) == true,
      "Invalid claim"
    );
    require(hasClaimed(vaultId_, beneficiary_) == false, "Already claimed");

    Vault storage vault = vaults[vaultId_];

    uint256 _reward = (vault.currentBalance.mul(share_)).div(
      vault.unclaimedShare
    );

    require(_reward > 0, "No reward");

    totalDistributedBalance = totalDistributedBalance.sub(_reward);
    vault.currentBalance = vault.currentBalance.sub(_reward);
    vault.unclaimedShare = vault.unclaimedShare.sub(share_);

    vault.claimed[beneficiary_] = true;

    pop.transfer(beneficiary_, _reward);

    emit RewardClaimed(vaultId_, beneficiary_, _reward);
  }

  /**
   * @notice Allocates unallocated POP token balance to vaults
   * @dev Requires at least one open vault
   */
  function allocateRewards() public override nonReentrant {
    uint256 availableReward = pop.balanceOf(address(this)).sub(
      totalDistributedBalance
    );
    require(availableReward > 0, "no rewards available");

    uint8 _openVaultCount = _getOpenVaultCount();
    require(_openVaultCount > 0, "no open vaults");

    //@todo handle dust after div
    uint256 _allocation = availableReward.div(_openVaultCount);
    bool zeroWasCounted = false;
    for (uint8 i = 0; i < 3; i++) {
      uint256 vaultId = activeVaults[i];
      if (
        uint8(vaults[vaultId].term) == i &&
        vaults[vaultId].status == VaultStatus.Open &&
        vaults[vaultId].merkleRoot != ""
      ) {
        vaults[vaultId].totalAllocated = vaults[vaultId].totalAllocated.add(
          _allocation
        );
        vaults[vaultId].currentBalance = vaults[vaultId].currentBalance.add(
          _allocation
        );
      }
    }
    totalDistributedBalance = totalDistributedBalance.add(availableReward);
    emit RewardsAllocated(availableReward);
  }

  /* ========== RESTRICTED FUNCTIONS ========== */

  function _getOpenVaultCount() internal view returns (uint8) {
    uint8 _openVaultCount = 0;
    bool zeroWasCounted = false;
    for (uint8 i = 0; i < 3; i++) {
      uint256 vaultId = activeVaults[i];
      if (
        uint8(vaults[vaultId].term) == i &&
        vaults[vaultId].merkleRoot != "" &&
        vaults[vaultId].status == VaultStatus.Open
      ) {
        _openVaultCount++;
      }
    }
    return _openVaultCount;
  }

  /* ========== SETTER ========== */

  /**
   * @notice Overrides existing BeneficiaryRegistry contract
   * @param beneficiaryRegistry_ Address of new BeneficiaryRegistry contract
   * @dev Must implement IBeneficiaryRegistry and cannot be same as existing
   */
  function setBeneficiaryRegistry(IBeneficiaryRegistry beneficiaryRegistry_)
    public
  {
    aclRegistry.requireRole(keccak256("DAO"), msg.sender);
    require(
      beneficiaryRegistry != beneficiaryRegistry_,
      "Same BeneficiaryRegistry"
    );
    IBeneficiaryRegistry _beneficiaryRegistry = beneficiaryRegistry;
    beneficiaryRegistry = beneficiaryRegistry_;
    emit BeneficiaryRegistryChanged(_beneficiaryRegistry, beneficiaryRegistry);
  }
}
