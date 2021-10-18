# KeeperIncentive
***
## Functions:
- [`constructor()`](#constructor_)
- [`handleKeeperIncentive()`](#handleKeeperIncentive_)
- [`createIncentive()`](#createIncentive_)
- [`updateIncentive()`](#updateIncentive_)
- [`toggleApproval()`](#toggleApproval_)
- [`toggleIncentive()`](#toggleIncentive_)
- [`fundIncentive()`](#fundIncentive_)
- [`addControllerContract()`](#addControllerContract_)
- [`updateBurnRate()`](#updateBurnRate_)
- [`updateRequiredKeeperStake()`](#updateRequiredKeeperStake_)
## Events:
- [`IncentiveCreated`](#IncentiveCreated_)
- [`IncentiveChanged`](#IncentiveChanged_)
- [`IncentiveFunded`](#IncentiveFunded_)
- [`ApprovalToggled`](#ApprovalToggled_)
- [`IncentiveToggled`](#IncentiveToggled_)
- [`ControllerContractAdded`](#ControllerContractAdded_)
- [`Burned`](#Burned_)
- [`BurnRateChanged`](#BurnRateChanged_)
- [`RequiredKeeperStakeChanged`](#RequiredKeeperStakeChanged_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(contract IContractRegistry _contractRegistry, uint256 _burnRate, uint256 _requiredKeeperStake) public 
```
### <a name="handleKeeperIncentive_"></a> handleKeeperIncentive() {#handleKeeperIncentive_}
```
handleKeeperIncentive(bytes32 contractName_, uint8 i, address keeper) external 
```
### <a name="createIncentive_"></a> createIncentive() {#createIncentive_}
```
createIncentive(bytes32 contractName_, uint256 _reward, bool _enabled, bool _openToEveryone) public 
```
This function is only for creating unique incentives for future contracts
Multiple functions can use the same incentive which can than be updated with one governance vote
| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| Name of contract that uses ParticipationRewards in bytes32|
| `_reward`| uint256| The amount in POP the Keeper receives for calling the function|
| `_enabled`| bool| Is this Incentive currently enabled?|
| `_openToEveryone`| bool| Can anyone call the function for rewards or only keeper?|
### <a name="updateIncentive_"></a> updateIncentive() {#updateIncentive_}
```
updateIncentive(bytes32 contractName_, uint8 i, uint256 _reward, bool _enabled, bool _openToEveryone) external 
```
### <a name="toggleApproval_"></a> toggleApproval() {#toggleApproval_}
```
toggleApproval(bytes32 contractName_, uint8 i) external 
```
### <a name="toggleIncentive_"></a> toggleIncentive() {#toggleIncentive_}
```
toggleIncentive(bytes32 contractName_, uint8 i) external 
```
### <a name="fundIncentive_"></a> fundIncentive() {#fundIncentive_}
```
fundIncentive(uint256 _amount) external 
```
### <a name="addControllerContract_"></a> addControllerContract() {#addControllerContract_}
```
addControllerContract(bytes32 contractName_, address contract_) external 
```
all critical functions to init/open vaults and add shares to them can only be called by controller contracts
| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the name of the controller contract in bytes32|
| `contract_`| address| the address of the controller contract|
### <a name="updateBurnRate_"></a> updateBurnRate() {#updateBurnRate_}
```
updateBurnRate(uint256 _burnRate) external 
```
| Parameter Name | Type | Description |
|------------|-----| -------|
| `_burnRate`| uint256| Percentage in Mantissa. (1e14 = 1 Basis Point)|
### <a name="updateRequiredKeeperStake_"></a> updateRequiredKeeperStake() {#updateRequiredKeeperStake_}
```
updateRequiredKeeperStake(uint256 _amount) external 
```
| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amount`| uint256| Amount of POP a keeper needs to stake|
## Events
### <a name="IncentiveCreated_"></a> IncentiveCreated {#IncentiveCreated_}
```
IncentiveCreated(bytes32 contractName, uint256 reward, bool openToEveryone)
```
### <a name="IncentiveChanged_"></a> IncentiveChanged {#IncentiveChanged_}
```
IncentiveChanged(bytes32 contractName, uint256 oldReward, uint256 newReward, bool oldOpenToEveryone, bool newOpenToEveryone)
```
### <a name="IncentiveFunded_"></a> IncentiveFunded {#IncentiveFunded_}
```
IncentiveFunded(uint256 amount)
```
### <a name="ApprovalToggled_"></a> ApprovalToggled {#ApprovalToggled_}
```
ApprovalToggled(bytes32 contractName, bool openToEveryone)
```
### <a name="IncentiveToggled_"></a> IncentiveToggled {#IncentiveToggled_}
```
IncentiveToggled(bytes32 contractName, bool enabled)
```
### <a name="ControllerContractAdded_"></a> ControllerContractAdded {#ControllerContractAdded_}
```
ControllerContractAdded(bytes32 contractName, address contractAddress)
```
### <a name="Burned_"></a> Burned {#Burned_}
```
Burned(uint256 amount)
```
### <a name="BurnRateChanged_"></a> BurnRateChanged {#BurnRateChanged_}
```
BurnRateChanged(uint256 oldRate, uint256 newRate)
```
### <a name="RequiredKeeperStakeChanged_"></a> RequiredKeeperStakeChanged {#RequiredKeeperStakeChanged_}
```
RequiredKeeperStakeChanged(uint256 oldRequirement, uint256 newRequirement)
```
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](images/KeeperIncentive_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](images/KeeperIncentive_inheritance_graph.png)
