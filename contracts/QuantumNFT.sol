
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./QuantumSecure.sol";

contract QuantumNFT is ERC721 {
    using QuantumSecure for bytes;
    
    uint256 private _tokenIds;
    mapping(uint256 => bytes) private _signatures;
    
    constructor() ERC721("QuantumNFT", "QNFT") {}
    
    function mintWithSignature(
        address recipient,
        bytes memory signature,
        bytes memory message,
        bytes memory publicKey
    ) public returns (uint256) {
        require(QuantumSecure.verifyDilithium(signature, message, publicKey), "Invalid quantum signature");
        
        _tokenIds++;
        _mint(recipient, _tokenIds);
        _signatures[_tokenIds] = signature;
        
        return _tokenIds;
    }
    
    function getSignature(uint256 tokenId) public view returns (bytes memory) {
        require(_exists(tokenId), "Token does not exist");
        return _signatures[tokenId];
    }
}
