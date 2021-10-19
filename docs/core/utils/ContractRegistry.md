# ContractRegistry
***
This Contract holds reference to all our contracts. Every contract A that needs to interact with another contract B calls this contract
to ask for the address of B.
This allows us to update addresses in one central point and reduces constructing and management overhead.
## Functions:
- [`constructor()`](#constructor_)
- [`getContractNames()`](#getContractNames_)
- [`getContract()`](#getContract_)
- [`addContract()`](#addContract_)
- [`updateContract()`](#updateContract_)
- [`deleteContract()`](#deleteContract_)
## Events:
- [`ContractAdded`](#ContractAdded_)
- [`ContractUpdated`](#ContractUpdated_)
- [`ContractDeleted`](#ContractDeleted_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(contract IACLRegistry _aclRegistry) public 
```
### <a name="getContractNames_"></a> getContractNames() {#getContractNames_}
```
getContractNames() external  returns (bytes32[])
```
### <a name="getContract_"></a> getContract() {#getContract_}
```
getContract(bytes32 _name) external  returns (address)
```
### <a name="addContract_"></a> addContract() {#addContract_}
```
addContract(bytes32 _name, address _address, bytes32 _version) external 
```
### <a name="updateContract_"></a> updateContract() {#updateContract_}
```
updateContract(bytes32 _name, address _newAddress, bytes32 _version) external 
```
### <a name="deleteContract_"></a> deleteContract() {#deleteContract_}
```
deleteContract(bytes32 _name, uint256 _contractIndex) external 
```
## Events
### <a name="ContractAdded_"></a> ContractAdded {#ContractAdded_}
```
ContractAdded(bytes32 _name, address _address, bytes32 _version)
```
### <a name="ContractUpdated_"></a> ContractUpdated {#ContractUpdated_}
```
ContractUpdated(bytes32 _name, address _address, bytes32 _version)
```
### <a name="ContractDeleted_"></a> ContractDeleted {#ContractDeleted_}
```
ContractDeleted(bytes32 _name)
```
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](/docs/images/ContractRegistry_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](/docs/images/ContractRegistry_inheritance_graph.png)
