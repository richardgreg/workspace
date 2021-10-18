# HysiBatchZapper
***
## Functions:
- [`constructor()`](#constructor_)
- [`zapIntoBatch()`](#zapIntoBatch_)
- [`zapOutOfBatch()`](#zapOutOfBatch_)
- [`claimAndSwapToStable()`](#claimAndSwapToStable_)
## Events:
- [`ZappedIntoBatch`](#ZappedIntoBatch_)
- [`ZappedOutOfBatch`](#ZappedOutOfBatch_)
- [`ClaimedIntoStable`](#ClaimedIntoStable_)
## Graphs:
- [`Dependency Graph`](#dependencyGraph)
- [`Inheritance Graph`](#inheritanceGraph)
***
## Function Definitions:
### <a name="constructor_"></a> constructor() {#constructor_}
```
constructor(contract IContractRegistry contractRegistry_, contract Curve3Pool curve3Pool_, contract IERC20 threeCrv_) public 
```
### <a name="zapIntoBatch_"></a> zapIntoBatch() {#zapIntoBatch_}
```
zapIntoBatch(uint256[3] amounts_, uint256 min_mint_amounts_) external 
```
The amounts in amounts_ must align with their index in the curve three-pool
| Parameter Name | Type | Description |
|------------|-----| -------|
| `amounts_`| uint256[3]| An array of amounts in stablecoins the user wants to deposit|
| `min_mint_amounts_`| uint256| The min amount of 3CRV which should be minted by the curve three-pool (slippage control)|
### <a name="zapOutOfBatch_"></a> zapOutOfBatch() {#zapOutOfBatch_}
```
zapOutOfBatch(bytes32 batchId_, uint256 amountToWithdraw_, uint8 stableCoinIndex_, uint256 min_amount_) external 
```
The stableCoinIndex_ must align with the index in the curve three-pool
| Parameter Name | Type | Description |
|------------|-----| -------|
| `batchId_`| bytes32| Defines which batch gets withdrawn from|
| `amountToWithdraw_`| uint256| 3CRV amount that shall be withdrawn|
| `stableCoinIndex_`| uint8| Defines which stablecoin the user wants to receive|
| `min_amount_`| uint256| The min amount of stables which should be returned by the curve three-pool (slippage control)|
### <a name="claimAndSwapToStable_"></a> claimAndSwapToStable() {#claimAndSwapToStable_}
```
claimAndSwapToStable(bytes32 batchId_, uint8 stableCoinIndex_, uint256 min_amount_) external 
```
The stableCoinIndex_ must align with the index in the curve three-pool
| Parameter Name | Type | Description |
|------------|-----| -------|
| `batchId_`| bytes32| Defines which batch gets withdrawn from|
| `stableCoinIndex_`| uint8| Defines which stablecoin the user wants to receive|
| `min_amount_`| uint256| The min amount of stables which should be returned by the curve three-pool (slippage control)|
## Events
### <a name="ZappedIntoBatch_"></a> ZappedIntoBatch {#ZappedIntoBatch_}
```
ZappedIntoBatch(uint256 threeCurveAmount, address account)
```
### <a name="ZappedOutOfBatch_"></a> ZappedOutOfBatch {#ZappedOutOfBatch_}
```
ZappedOutOfBatch(bytes32 batchId, uint8 stableCoinIndex, uint256 threeCurveAmount, uint256 stableCoinAmount, address account)
```
### <a name="ClaimedIntoStable_"></a> ClaimedIntoStable {#ClaimedIntoStable_}
```
ClaimedIntoStable(bytes32 batchId, uint8 stableCoinIndex, uint256 threeCurveAmount, uint256 stableCoinAmount, address account)
```
## Graphs
### <a name="dependencyGraph"></a> `Dependency Graph` {#dependencyGraph}
![Dependency Graph](images/HysiBatchZapper_dependency_graph.png)
### <a name="inheritanceGraph"></a> `Inheritance Graph` {#inheritanceGraph}
![Inheritance Graph](images/HysiBatchZapper_inheritance_graph.png)
