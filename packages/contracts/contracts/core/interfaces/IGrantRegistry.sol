// SPDX-License-Identifier: MIT

// Docgen-SOLC: 0.8.0
pragma solidity ^0.8.0;

interface IGrantRegistry {
  function createGrant(
    uint8,
    address[] calldata,
    uint256[] calldata
  ) external;
}
