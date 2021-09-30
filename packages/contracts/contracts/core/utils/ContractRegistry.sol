// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "../interfaces/IACLRegistry.sol";
import "../interfaces/IContractRegistry.sol";

/**
 * @dev This Contract holds reference to all our contracts. Every contract A that needs to interact with another contract B calls this contract
 * to ask for the address of B.
 * This allows us to update addresses in one central point and reduces constructing and management overhead.
 */
contract ContractRegistry is IContractRegistry {
  /* ========== STATE VARIABLES ========== */

  IACLRegistry public aclRegistry;

  mapping(bytes32 => address) public contracts;
  bytes32[] public contractNames;

  /* ========== EVENTS ========== */

  event ContractAdded(bytes32 _name, address _address);
  event ContractUpdated(bytes32 _name, address _address);
  event ContractDeleted(bytes32 _name);

  /* ========== CONSTRUCTOR ========== */

  constructor(IACLRegistry _aclRegistry) {
    aclRegistry = _aclRegistry;
    contracts[keccak256("ACLRegistry")] = address(_aclRegistry);
    contractNames.push(keccak256("ACLRegistry"));
  }

  /* ========== VIEW FUNCTIONS ========== */

  function getContractNames() external view returns (bytes32[] memory) {
    return contractNames;
  }

  function getContract(bytes32 _name) external view override returns (address) {
    return contracts[_name];
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  function addContract(bytes32 _name, address _address) external {
    aclRegistry.hasRole(keccak256("Comptroller"), msg.sender);
    require(contracts[_name] == address(0), "contract already exists");
    contracts[_name] = _address;
    contractNames.push(_name);
    emit ContractAdded(_name, _address);
  }

  function updateContract(bytes32 _name, address _newAddress) external {
    aclRegistry.hasRole(keccak256("Comptroller"), msg.sender);
    require(contracts[_name] != address(0), "contract doesnt exist");
    contracts[_name] = _newAddress;
    emit ContractUpdated(_name, _newAddress);
  }

  function deleteContract(bytes32 _name, uint256 _contractIndex) external {
    aclRegistry.hasRole(keccak256("Comptroller"), msg.sender);
    require(contracts[_name] != address(0), "contract doesnt exist");
    require(
      contractNames[_contractIndex] == _name,
      "this is not the contract you are looking for"
    );
    delete contracts[_name];
    delete contractNames[_contractIndex];
    emit ContractDeleted(_name);
  }
}
