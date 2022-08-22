// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Token is ERC721URIStorage{

    uint256 public tokenCount;

    constructor() ERC721("Bito NFT", "NFT"){

    }

    function getTokenCount() public view returns(uint256){
        return tokenCount;
    }

    function mintNFT(string memory _tokenURI) public returns(uint256){
        tokenCount++;

        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        

        return tokenCount;
    }
}