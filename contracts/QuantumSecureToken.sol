
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./QuantumSecure.sol";

contract QuantumSecureToken is ERC20 {
    using QuantumSecure for bytes;
    
    uint256 public dilithiumKeyLength;
    uint256 public kyberKeyLength;
    uint256 public rainbowKeyLength;
    uint8 private _decimals;
    
    mapping(bytes => bool) public usedSignatures;
    mapping(address => bytes) public userPublicKeys;
    
    event SecureTransfer(address indexed from, address indexed to, uint256 amount, bytes signature);
    event KeyExchangeCompleted(address indexed user, bytes sharedSecret);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsAmount,
        uint256 _dilithiumKeyLength,
        uint256 _kyberKeyLength,
        uint256 _rainbowKeyLength
    ) ERC20(name, symbol) {
        require(_dilithiumKeyLength >= 2420, "Dilithium key length too short");
        require(_kyberKeyLength >= 800, "Kyber key length too short");
        require(_rainbowKeyLength >= 528, "Rainbow key length too short");
        
        _decimals = decimalsAmount;
        dilithiumKeyLength = _dilithiumKeyLength;
        kyberKeyLength = _kyberKeyLength;
        rainbowKeyLength = _rainbowKeyLength;
        
        _mint(msg.sender, initialSupply * 10**decimalsAmount);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    function secureTransfer(
        address to,
        uint256 amount,
        bytes memory signature,
        bytes memory message,
        bytes memory publicKey
    ) public returns (bool) {
        require(!usedSignatures[signature], "Signature already used");
        require(signature.length >= dilithiumKeyLength, "Invalid signature length");
        require(QuantumSecure.verifyDilithium(signature, message, publicKey), "Invalid quantum signature");
        
        usedSignatures[signature] = true;
        _transfer(_msgSender(), to, amount);
        emit SecureTransfer(_msgSender(), to, amount, signature);
        return true;
    }
    
    function registerPublicKey(bytes memory publicKey) public {
        require(publicKey.length >= kyberKeyLength, "Invalid public key length");
        userPublicKeys[msg.sender] = publicKey;
        
        (bytes memory sharedSecret,) = QuantumSecure.kyberEncapsulate(publicKey);
        emit KeyExchangeCompleted(msg.sender, sharedSecret);
    }
}
