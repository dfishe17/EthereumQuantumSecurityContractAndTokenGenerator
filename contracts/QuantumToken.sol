
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./QuantumSecure.sol";

contract QuantumToken is ERC20 {
    using QuantumSecure for bytes;
    
    constructor(uint256 initialSupply) ERC20("QuantumToken", "QTUM") {
        _mint(msg.sender, initialSupply);
    }
    
    function secureTransfer(
        address to,
        uint256 amount,
        bytes memory signature,
        bytes memory message,
        bytes memory publicKey
    ) public returns (bool) {
        require(QuantumSecure.verifyDilithium(signature, message, publicKey), "Invalid quantum signature");
        _transfer(_msgSender(), to, amount);
        return true;
    }
}
