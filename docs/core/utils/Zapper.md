# Zapper
***
## Functions:
- [`constructor()`](#constructor)
- [`token()`](#token)
- [`curveMetapoolAddress()`](#curvemetapooladdress)
- [`curveBasepoolAddress()`](#curvebasepooladdress)
- [`supportedTokens()`](#supportedtokens)
- [`canZap()`](#canzap)
- [`tokenIndex()`](#tokenindex)
- [`zapIn()`](#zapin)
- [`zapOut()`](#zapout)
## Events:
- [`ZapIn`](#zapin)
- [`ZapOut`](#zapout)
## Graphs:
- [Dependency Graph](#dependency-graph)
- [Inheritance Graph](#inheritance-graph)
***
## Function Definitions:
###  constructor()
```
constructor(address _curveAddressProvider) public 
```
###  token()
```
token(address _popcornPool) public  returns (address)
```
###  curveMetapoolAddress()
```
curveMetapoolAddress(address _popcornPool) public  returns (address)
```
###  curveBasepoolAddress()
```
curveBasepoolAddress(address _popcornPool) public  returns (address)
```
###  supportedTokens()
```
supportedTokens(address _popcornPool) public  returns (address[8])
```
###  canZap()
```
canZap(address _popcornPool, address tokenAddress) public  returns (bool)
```
###  tokenIndex()
```
tokenIndex(address _popcornPool, address tokenAddress) public  returns (uint8)
```
###  zapIn()
```
zapIn(address _popcornPool, address depositToken, uint256 amount) public  returns (uint256)
```
###  zapOut()
```
zapOut(address _popcornPool, address withdrawalToken, uint256 amount) public  returns (uint256)
```
## Events
### ZapIn
```
ZapIn(address account, address depositToken, uint256 depositAmount, uint256 shares)
```
### ZapOut
```
ZapOut(address account, address withdrawalShares, uint256 shares, uint256 withdrawalAmount)
```
## Graphs
### Dependency Graph
![Dependency Graph](/docs/images/Zapper_dependency_graph.png)
### Inheritance Graph
![Inheritance Graph](/docs/images/Zapper_inheritance_graph.png)
