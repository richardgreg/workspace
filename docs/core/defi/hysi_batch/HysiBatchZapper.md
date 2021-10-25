# HysiBatchZapper
***
## Functions:
- [`constructor()`](#constructor)
- [`zapIntoBatch()`](#zapintobatch)
- [`zapOutOfBatch()`](#zapoutofbatch)
- [`claimAndSwapToStable()`](#claimandswaptostable)
## Events:
- [`ZappedIntoBatch`](#zappedintobatch)
- [`ZappedOutOfBatch`](#zappedoutofbatch)
- [`ClaimedIntoStable`](#claimedintostable)
## Graphs:
- [Dependency Graph](#dependency-graph)
- [Inheritance Graph](#inheritance-graph)
***
## Function Definitions:
###  constructor()
```
constructor(contract IContractRegistry _contractRegistry, contract Curve3Pool _curve3Pool, contract IERC20 _threeCrv) public 
```
###  zapIntoBatch()
```
zapIntoBatch(uint256[3] _amounts, uint256 _min_mint_amounts) external 
```
The amounts in _amounts must align with their index in the curve three-pool

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amounts`| uint256[3]| An array of amounts in stablecoins the user wants to deposit|
| `_min_mint_amounts`| uint256| The min amount of 3CRV which should be minted by the curve three-pool (slippage control)|

###  zapOutOfBatch()
```
zapOutOfBatch(bytes32 _batchId, uint256 _amountToWithdraw, uint8 _stableCoinIndex, uint256 _min_amount) external 
```
The _stableCoinIndex must align with the index in the curve three-pool

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_batchId`| bytes32| Defines which batch gets withdrawn from|
| `_amountToWithdraw`| uint256| 3CRV amount that shall be withdrawn|
| `_stableCoinIndex`| uint8| Defines which stablecoin the user wants to receive|
| `_min_amount`| uint256| The min amount of stables which should be returned by the curve three-pool (slippage control)|

###  claimAndSwapToStable()
```
claimAndSwapToStable(bytes32 _batchId, uint8 _stableCoinIndex, uint256 _min_amount) external 
```
The _stableCoinIndex must align with the index in the curve three-pool

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_batchId`| bytes32| Defines which batch gets withdrawn from|
| `_stableCoinIndex`| uint8| Defines which stablecoin the user wants to receive|
| `_min_amount`| uint256| The min amount of stables which should be returned by the curve three-pool (slippage control)|

## Events
### ZappedIntoBatch
```
ZappedIntoBatch(uint256 threeCurveAmount, address account)
```
### ZappedOutOfBatch
```
ZappedOutOfBatch(bytes32 batchId, uint8 stableCoinIndex, uint256 threeCurveAmount, uint256 stableCoinAmount, address account)
```
### ClaimedIntoStable
```
ClaimedIntoStable(bytes32 batchId, uint8 stableCoinIndex, uint256 threeCurveAmount, uint256 stableCoinAmount, address account)
```
## Graphs
### Dependency Graph
![Dependency Graph](/docs/images/HysiBatchZapper_dependency_graph.png)
### Inheritance Graph
![Inheritance Graph](/docs/images/HysiBatchZapper_inheritance_graph.png)
