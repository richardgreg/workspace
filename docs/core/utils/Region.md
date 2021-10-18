# Region
***
## Functions:
- [`constructor()`](#constructor_)
- [`getAllRegions()`](#getAllRegions_)
- [`getAllVaults()`](#getAllVaults_)
- [`addRegion()`](#addRegion_)
## Events:
- [`RegionAdded`](#RegionAdded_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(address beneficiaryVault_, contract IContractRegistry contractRegistry_) public 
```
### <a name="getAllRegions_"></a> getAllRegions() {#getAllRegions_}
```
getAllRegions() public  returns (bytes32[])
```
### <a name="getAllVaults_"></a> getAllVaults() {#getAllVaults_}
```
getAllVaults() public  returns (address[])
```
### <a name="addRegion_"></a> addRegion() {#addRegion_}
```
addRegion(bytes32 region_, address beneficiaryVault_) external 
```
## Events
### <a name="RegionAdded_"></a> RegionAdded {#RegionAdded_}
```
RegionAdded(bytes32 region)
```
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](images/Region_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](images/Region_inheritance_graph.png)
