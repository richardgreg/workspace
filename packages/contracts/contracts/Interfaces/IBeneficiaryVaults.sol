// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

interface IBeneficiaryVaults {
  function activeVaults(uint256 term) external view returns (uint256);

  function vaultCanBeClosed(uint8 term) external view returns (bool);

  function openVault(
    uint256 vaultId_,
    uint8 electionTerm_,
    bytes32 merkleRoot_
  ) external;

  function closeVault(uint256 vaultId_) external;

  function allocateRewards() external;
}
