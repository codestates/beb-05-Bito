// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/ERC-20.sol";
import "../contracts/ERC-721.sol";
import "../contracts/Marketplace.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    ERC20Token token20;
    ERC721Token token721;
    Marketplace marketplace;


    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        // <instantiate contract>
        Assert.equal(uint(1), uint(1), "1 should be equal to 1");
        token20 = new ERC20Token();
        token721 = new ERC721Token();
        marketplace = new Marketplace();
    }

    function ERC20_ContractTest() public{
        Assert.equal(token20.name(), "Bito Token", "Token name should be equal");
        Assert.greaterThan(uint(token20.balanceOf(address(token20))) , uint(0), "shshsh");
    }

    function ERC721_ContractTest() public{
        marketplace.createERC721Token("exampleToken", 1);
        Assert.greaterThan(uint(marketplace.tokenCnt()), uint(0), "tokenCnt should be increased");
        // Assert.greaterThan(uint(token721.getTokenCount()), uint(0), "tokenCount should be incresed");
    }

    function checkSuccess() public {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        Assert.ok(2 == 2, 'should be true');
        Assert.greaterThan(uint(2), uint(1), "2 should be greater than to 1");
        Assert.lesserThan(uint(2), uint(3), "2 should be lesser than to 3");
    }



    // function checkSuccess2() public pure returns (bool) {
    //     // Use the return value (true or false) to test the contract
    //     return true;
    // }
    
    // function checkFailure() public {
    //     Assert.notEqual(uint(1), uint(1), "1 should not be equal to 1");
    // }

    // /// Custom Transaction Context: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    // /// #sender: account-1
    // /// #value: 100
    // function checkSenderAndValue() public payable {
    //     // account index varies 0-9, value is in wei
    //     Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
    //     Assert.equal(msg.value, 100, "Invalid value");
    // }
}
    