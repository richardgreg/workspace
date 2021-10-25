# Pool
***
## Functions:
- [`constructor()`](#constructor)
- [`deposit()`](#deposit)
- [`depositFor()`](#depositfor)
- [`withdraw()`](#withdraw)
- [`transfer()`](#transfer)
- [`transferFrom()`](#transferfrom)
- [`takeFees()`](#takefees)
- [`setWithdrawalFee()`](#setwithdrawalfee)
- [`setManagementFee()`](#setmanagementfee)
- [`setPerformanceFee()`](#setperformancefee)
- [`withdrawAccruedFees()`](#withdrawaccruedfees)
- [`pauseContract()`](#pausecontract)
- [`unpauseContract()`](#unpausecontract)
- [`pricePerPoolToken()`](#priceperpooltoken)
- [`totalValue()`](#totalvalue)
- [`valueFor()`](#valuefor)
## Events:
- [`Deposit`](#deposit)
- [`Withdrawal`](#withdrawal)
- [`WithdrawalFee`](#withdrawalfee)
- [`PerformanceFee`](#performancefee)
- [`ManagementFee`](#managementfee)
- [`WithdrawalFeeChanged`](#withdrawalfeechanged)
- [`ManagementFeeChanged`](#managementfeechanged)
- [`PerformanceFeeChanged`](#performancefeechanged)
## Modifiers:
- [`blockLocked()`](#blocklocked)
## Graphs:
- [Dependency Graph](#dependency-graph)
- [Inheritance Graph](#inheritance-graph)
***
## Function Definitions:
###  constructor()
```
constructor(address _token, address _yearnRegistry, contract IContractRegistry _contractRegistry) public 
```
###  deposit()
```
deposit(uint256 _amount) public  returns (uint256)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amount`| uint256| Quantity of tokens to deposit.|

#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Quantity| uint256|of pool tokens issued to caller.|

###  depositFor()
```
depositFor(uint256 _amount, address _recipient) public  returns (uint256)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amount`| uint256| Quantity of tokens to deposit.|
| `_recipient`| address| Recipient of issued pool tokens.|

#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Quantity| uint256|of pool tokens issued to recipient.|

###  withdraw()
```
withdraw(uint256 _amount) public  returns (uint256)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amount`| uint256| Quantity of pool tokens to exchange for underlying tokens.|

#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Quantity| uint256|of underlying tokens sent to caller.|

###  transfer()
```
transfer(address _recipient, uint256 _amount) public  returns (bool)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_recipient`| address| Address pool tokens are being transferred to. Must not be this contract's address or 0x0.|
| `_amount`| uint256| Quantity of pool tokens to transfer to `_recipient`.|

#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|True| address|if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.|

###  transferFrom()
```
transferFrom(address _sender, address _recipient, uint256 _amount) public  returns (bool)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_sender`| address| Address pool tokens are being transferred from.|
| `_recipient`| address| Address pool tokens are being transferred to. Must not be this contract's address or 0x0.|
| `_amount`| uint256| Quantity of pool tokens to transfer.|

#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|True| address|if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.|

###  takeFees()
```
takeFees() external 
```
###  setWithdrawalFee()
```
setWithdrawalFee(uint256 _withdrawalFee) external 
```
Value is in basis points, i.e. 100 BPS = 1%

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_withdrawalFee`| uint256| New `withdrawalFee` in BPS.|

###  setManagementFee()
```
setManagementFee(uint256 _managementFee) external 
```
Value is in basis points, i.e. 100 BPS = 1%

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_managementFee`| uint256| New `managementFee` in BPS.|

###  setPerformanceFee()
```
setPerformanceFee(uint256 _performanceFee) external 
```
Value is in basis points, i.e. 100 BPS = 1%

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_performanceFee`| uint256| New `performanceFee` in BPS.|

###  withdrawAccruedFees()
```
withdrawAccruedFees() external 
```
###  pauseContract()
```
pauseContract() external 
```
###  unpauseContract()
```
unpauseContract() external 
```
###  pricePerPoolToken()
```
pricePerPoolToken() public  returns (uint256)
```
Pool tokens are denominated with 18 decimals. Return value based on underlying token's decimals.
#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Price| |per pool token in underlying token.
|

###  totalValue()
```
totalValue() public  returns (uint256)
```
Return value is denominated in underlying token.
#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Total| |value of pool deposits in underlying token.
|

###  valueFor()
```
valueFor(uint256 _amount) public  returns (uint256)
```
Return value is denominated in underlying token.
#### Return Values:

| Return Name | Type | Description |
|-------------|-------|------------|
|Value| uint256|of `_amount` of pool tokens in underlying token.
|

## Events
### Deposit
```
Deposit(address from, uint256 deposit, uint256 poolTokens)
```
### Withdrawal
```
Withdrawal(address to, uint256 amount)
```
### WithdrawalFee
```
WithdrawalFee(address to, uint256 amount)
```
### PerformanceFee
```
PerformanceFee(uint256 amount)
```
### ManagementFee
```
ManagementFee(uint256 amount)
```
### WithdrawalFeeChanged
```
WithdrawalFeeChanged(uint256 previousBps, uint256 newBps)
```
### ManagementFeeChanged
```
ManagementFeeChanged(uint256 previousBps, uint256 newBps)
```
### PerformanceFeeChanged
```
PerformanceFeeChanged(uint256 previousBps, uint256 newBps)
```
## Modifiers
### `blockLocked()`
```
blockLocked()
```
## Graphs
### Dependency Graph
![Dependency Graph](/docs/images/Pool_dependency_graph.png)
### Inheritance Graph
![Inheritance Graph](/docs/images/Pool_inheritance_graph.png)
