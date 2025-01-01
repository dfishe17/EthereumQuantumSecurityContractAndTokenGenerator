
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleERC20 is ERC20 {
    uint8 private _decimals;
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsAmount
    ) ERC20(name, symbol) {
        _decimals = decimalsAmount;
        _mint(msg.sender, initialSupply * 10**decimalsAmount);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}
