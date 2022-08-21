// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Token is ERC721URIStorage {

    uint256 public tokenCount;

    constructor() ERC721("Bito NFT", "NFT"){

    }

    function getTokenCount() public view returns(uint256){
        return tokenCount;
    }

    function mintNFT(address _owner, string memory _tokenURI) public returns(uint256){
        require(_owner != address(0x0));

        tokenCount++;

        _safeMint(_owner, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        

        return tokenCount;
    }

    function setApprovalForNFTs(address _owner) public returns(bool){
        require(_owner != address(0x0));
        _setApprovalForAll(_owner, msg.sender, true);
    }

    function tokenTrasferFrom(address _from, address _to, uint256 _tokenId) public returns(bool){

        require(_from != address(0x0), "address shouldn't be zero");
        require(_from != _to, "seller and buyer is different");
        require(isApprovedForAll(_from, msg.sender), "Ownership required");

        _transfer(_from, _to, _tokenId);
        return true;
    }
}