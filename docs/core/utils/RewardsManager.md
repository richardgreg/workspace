# RewardsManager
Manages distribution of POP rewards to Popcorn Treasury, DAO Staking, and Beneficiaries
***
## Functions:
- [`constructor()`](#constructor_)
- [`getRewardSplits()`](#getRewardSplits_)
- [`receive()`](#receive_)
- [`swapTokenForRewards()`](#swapTokenForRewards_)
- [`distributeRewards()`](#distributeRewards_)
- [`setRewardSplits()`](#setRewardSplits_)
## Events:
- [`StakingDeposited`](#StakingDeposited_)
- [`TreasuryDeposited`](#TreasuryDeposited_)
- [`InsuranceDeposited`](#InsuranceDeposited_)
- [`BeneficiaryVaultsDeposited`](#BeneficiaryVaultsDeposited_)
- [`RewardsDistributed`](#RewardsDistributed_)
- [`RewardSplitsUpdated`](#RewardSplitsUpdated_)
- [`TokenSwapped`](#TokenSwapped_)
- [`RegionChanged`](#RegionChanged_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(contract IContractRegistry contractRegistry_, contract IUniswapV2Router02 uniswapV2Router_) public 
```
### <a name="getRewardSplits_"></a> getRewardSplits() {#getRewardSplits_}
```
getRewardSplits() external  returns (uint256[4])
```
### <a name="receive_"></a> receive() {#receive_}
```
receive() external 
```
### <a name="swapTokenForRewards_"></a> swapTokenForRewards() {#swapTokenForRewards_}
```
swapTokenForRewards(address[] path_, uint256 minAmountOut_) public  returns (uint256[])
```
Path specification requires at least source token as first in path and POP address as last
Token swap internals implemented as described at https://uniswap.org/docs/v2/smart-contracts/router02/#swapexacttokensfortokens
| Parameter Name | Type | Description |
|------------|-----| -------|
| `path_`| address[]| Uniswap path specification for source token to POP|
| `minAmountOut_`| uint256| Minimum desired amount (>0) of POP tokens to be received from swap|
#### Return Values:
| Return Name | Type | Description |
|-------------|-------|------------|
|swapped| address[]|in/out amounts uint256 tuple|
### <a name="distributeRewards_"></a> distributeRewards() {#distributeRewards_}
```
distributeRewards() public 
```
Contract must have POP balance in order to distribute according to rewardSplits ratio
### <a name="setRewardSplits_"></a> setRewardSplits() {#setRewardSplits_}
```
setRewardSplits(uint256[4] splits_) public 
```
Values must be within rewardsLimit range, specified in percent to 18 decimal place precision
| Parameter Name | Type | Description |
|------------|-----| -------|
| `splits_`| uint256[4]| Array of RewardTargets enumerated uint256 values within rewardLimits range|
## Events
### <a name="StakingDeposited_"></a> StakingDeposited {#StakingDeposited_}
```
StakingDeposited(address to, uint256 amount)
```
### <a name="TreasuryDeposited_"></a> TreasuryDeposited {#TreasuryDeposited_}
```
TreasuryDeposited(address to, uint256 amount)
```
### <a name="InsuranceDeposited_"></a> InsuranceDeposited {#InsuranceDeposited_}
```
InsuranceDeposited(address to, uint256 amount)
```
### <a name="BeneficiaryVaultsDeposited_"></a> BeneficiaryVaultsDeposited {#BeneficiaryVaultsDeposited_}
```
BeneficiaryVaultsDeposited(uint256 amount)
```
### <a name="RewardsDistributed_"></a> RewardsDistributed {#RewardsDistributed_}
```
RewardsDistributed(uint256 amount)
```
### <a name="RewardSplitsUpdated_"></a> RewardSplitsUpdated {#RewardSplitsUpdated_}
```
RewardSplitsUpdated(uint256[4] splits)
```
### <a name="TokenSwapped_"></a> TokenSwapped {#TokenSwapped_}
```
TokenSwapped(address token, uint256 amountIn, uint256 amountOut)
```
### <a name="RegionChanged_"></a> RegionChanged {#RegionChanged_}
```
RegionChanged(contract IRegion from, contract IRegion to)
```
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](images/RewardsManager_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](images/RewardsManager_inheritance_graph.png)
