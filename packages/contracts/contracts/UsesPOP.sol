// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

contract UsesPOP {
  using SafeERC20 for IERC20;

  /* ========== STATE VARIABLE ========== */
  IERC20 public immutable POP;
}
