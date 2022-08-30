// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20{

    constructor(address _address) ERC20("Bito Token", "BTT"){
        _mint(_address, 1000000000000000000);
    }

    function transferERC20(address _from, address _to, uint256 _amount) public payable{
        require(_to != address(0x0));

        _transfer(_from, _to, _amount);

    }

    function exchangeERC20(address _from, address _to, uint256 _amount) public payable{
        require(_from != address(0x0));
        require(_to != address(0x0));
        require(this.balanceOf(_from) >= _amount);

        _transfer(_from, _to, _amount);
    }
}