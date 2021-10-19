# ParticipationReward
***
## Functions:
- [`constructor()`](#constructor_)
- [`isClaimable()`](#isClaimable_)
- [`hasClaim()`](#hasClaim_)
- [`getVaultStatus()`](#getVaultStatus_)
- [`getUserVaults()`](#getUserVaults_)
- [`initializeVault()`](#initializeVault_)
- [`openVault()`](#openVault_)
- [`addShares()`](#addShares_)
- [`claimReward()`](#claimReward_)
- [`claimRewards()`](#claimRewards_)
- [`setRewardsBudget()`](#setRewardsBudget_)
- [`addControllerContract()`](#addControllerContract_)
- [`toggleRewards()`](#toggleRewards_)
- [`contributeReward()`](#contributeReward_)
## Events:
- [`RewardBudgetChanged`](#RewardBudgetChanged_)
- [`VaultInitialized`](#VaultInitialized_)
- [`VaultOpened`](#VaultOpened_)
- [`VaultClosed`](#VaultClosed_)
- [`RewardClaimed`](#RewardClaimed_)
- [`RewardsClaimed`](#RewardsClaimed_)
- [`SharesAdded`](#SharesAdded_)
- [`RewardBalanceIncreased`](#RewardBalanceIncreased_)
- [`ControllerContractAdded`](#ControllerContractAdded_)
- [`RewardsToggled`](#RewardsToggled_)
## Modifiers:
- [`vaultExists()`](#vaultExists_)
- [`onlyControllerContract()`](#onlyControllerContract_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(contract IContractRegistry _contractRegistry) public 
```
### <a name="isClaimable_"></a> isClaimable() {#isClaimable_}
```
isClaimable(bytes32 vaultId_, address beneficiary_) public  returns (bool)
```
### <a name="hasClaim_"></a> hasClaim() {#hasClaim_}
```
hasClaim(bytes32 vaultId_, address beneficiary_) public  returns (bool)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `vaultId_`| bytes32| Bytes32|
| `beneficiary_`| address| address of the beneficiary|

### <a name="getVaultStatus_"></a> getVaultStatus() {#getVaultStatus_}
```
getVaultStatus(bytes32 vaultId_) external  returns (enum ParticipationReward.VaultStatus)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `vaultId_`| bytes32| Bytes32|

### <a name="getUserVaults_"></a> getUserVaults() {#getUserVaults_}
```
getUserVaults(address account) external  returns (bytes32[])
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `account`| address| address|

### <a name="initializeVault_"></a> initializeVault() {#initializeVault_}
```
initializeVault(bytes32 contractName_, bytes32 vaultId_, uint256 endTime_) external  returns (bool, bytes32)
```
There must be enough funds in this contract to support opening another vault

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| Name of contract that uses ParticipationRewards in bytes32|
| `vaultId_`| bytes32| Bytes32|
| `endTime_`| uint256| Unix timestamp in seconds after which a vault can be closed|

### <a name="openVault_"></a> openVault() {#openVault_}
```
openVault(bytes32 contractName_, bytes32 vaultId_) external 
```
Vault must be in an initialized state

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the controller contract|
| `vaultId_`| bytes32| Vault ID in bytes32|

### <a name="addShares_"></a> addShares() {#addShares_}
```
addShares(bytes32 contractName_, bytes32 vaultId_, address account_, uint256 shares_) external 
```
This will be called by contracts after an account has voted in order to add them to the vault of the specified election.

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the controller contract|
| `vaultId_`| bytes32| Bytes32|
| `account_`| address| address|
| `shares_`| uint256| uint256|

### <a name="claimReward_"></a> claimReward() {#claimReward_}
```
claimReward(uint256 index_) external 
```
Uses the vaultId_ at the specified index of userVaults.
This function is used when a user only wants to claim a specific vault or if they decide the gas cost of claimRewards are to high for now.
(lower cost but also lower reward)

| Parameter Name | Type | Description |
|------------|-----| -------|
| `index_`| uint256| uint256|

### <a name="claimRewards_"></a> claimRewards() {#claimRewards_}
```
claimRewards(uint256[] indices_) external 
```
Uses the vaultIds at the specified indices of userVaults.
This function is used when a user only wants to claim multiple vaults at once (probably most of the time)
The array of indices is limited to 19 as we want to prevent gas overflow of looping through too many vaults

| Parameter Name | Type | Description |
|------------|-----| -------|
| `indices_`| uint256[]| uint256[]|

### <a name="setRewardsBudget_"></a> setRewardsBudget() {#setRewardsBudget_}
```
setRewardsBudget(bytes32 contractName_, uint256 amount) external 
```
When opening a vault this contract must have enough POP to fund the rewardBudgets of the new vault
Every controller contract has their own rewardsBudget to set indivual rewards per controller contract

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the name of the controller contract in bytes32|
| `amount`| uint256| uint256 reward amount in POP per vault|

### <a name="addControllerContract_"></a> addControllerContract() {#addControllerContract_}
```
addControllerContract(bytes32 contractName_, address contract_) external 
```
all critical functions to init/open vaults and add shares to them can only be called by controller contracts

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the name of the controller contract in bytes32|
| `contract_`| address| the address of the controller contract|

### <a name="toggleRewards_"></a> toggleRewards() {#toggleRewards_}
```
toggleRewards(bytes32 contractName_) external 
```
all critical functions to init/open vaults and add shares to them can only be called by controller contracts

| Parameter Name | Type | Description |
|------------|-----| -------|
| `contractName_`| bytes32| the address of the controller contract|

### <a name="contributeReward_"></a> contributeReward() {#contributeReward_}
```
contributeReward(uint256 amount) external 
```
Sufficient RewardsBalance will be checked when opening a new vault to see if enough POP exist to support the new Vault

| Parameter Name | Type | Description |
|------------|-----| -------|
| `amount`| uint256| uint256 amount in POP to be used for vault rewards|

## Events
### <a name="RewardBudgetChanged_"></a> RewardBudgetChanged {#RewardBudgetChanged_}
```
RewardBudgetChanged(bytes32 contractName_, uint256 amount)
```
### <a name="VaultInitialized_"></a> VaultInitialized {#VaultInitialized_}
```
VaultInitialized(bytes32 vaultId)
```
### <a name="VaultOpened_"></a> VaultOpened {#VaultOpened_}
```
VaultOpened(bytes32 vaultId)
```
### <a name="VaultClosed_"></a> VaultClosed {#VaultClosed_}
```
VaultClosed(bytes32 vaultId)
```
### <a name="RewardClaimed_"></a> RewardClaimed {#RewardClaimed_}
```
RewardClaimed(bytes32 vaultId, address account_, uint256 amount)
```
### <a name="RewardsClaimed_"></a> RewardsClaimed {#RewardsClaimed_}
```
RewardsClaimed(address account_, uint256 amount)
```
### <a name="SharesAdded_"></a> SharesAdded {#SharesAdded_}
```
SharesAdded(bytes32 vaultId_, address account_, uint256 shares_)
```
### <a name="RewardBalanceIncreased_"></a> RewardBalanceIncreased {#RewardBalanceIncreased_}
```
RewardBalanceIncreased(address account, uint256 amount)
```
### <a name="ControllerContractAdded_"></a> ControllerContractAdded {#ControllerContractAdded_}
```
ControllerContractAdded(bytes32 contractName_, address contract_)
```
### <a name="RewardsToggled_"></a> RewardsToggled {#RewardsToggled_}
```
RewardsToggled(bytes32 contractName_, bool prevState, bool newState)
```
## Modifiers
### <a name="vaultExists_"></a> `vaultExists()` {#vaultExists_}
```
vaultExists(bytes32 vaultId_)
```
## Parameters:
- `vaultId_`: Bytes32
### <a name="onlyControllerContract_"></a> `onlyControllerContract()` {#onlyControllerContract_}
```
onlyControllerContract(bytes32 contractName_)
```
## Parameters:
- `contractName_`: Bytes32
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](/docs/images/ParticipationReward_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](/docs/images/ParticipationReward_inheritance_graph.png)
