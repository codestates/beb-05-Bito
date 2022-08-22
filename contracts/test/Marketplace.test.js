const assert = require('chai').assert;
// const Web3 = require('web3');
// const rpcURL = new Web3.providers.HttpProvider('http://127.0.0.1:9545/');
// const web3 = new Web3('http://127.0.0.1:9545/');
const Marketplace = artifacts.require("Marketplace");
let mp;
let account1, account2;

contract("Test of Test", ()=>{

    // 테스트를 위한 테스트
    it('test of test', ()=>{
        assert.ok(true, "test of test");
    })
})

contract("ERC20 / ERC721 Basic Test", async ()=>{
    before(async ()=>{
        mp = await Marketplace.deployed();
    })

    // ERC20/721 Name+Symbol Tesing
    it("Name Test", async ()=>{
        const ERC20_Name = await mp.token20Name();
        const ERC721_Name = await mp.token721Name();
        assert.ok(ERC721_Name=="Bito NFT", "Name required");
        assert.ok(ERC20_Name=="Bito Token", "Name required");
    });

    it("Symbol Test", async ()=>{
        const ERC20_Symbol = await mp.token20Symbol();
        const ERC721_Symbol = await mp.token721Symbol();
        assert.ok(ERC721_Symbol=="NFT", "Symbol required");
        assert.ok(ERC20_Symbol=="BTT", "Symbol required");
    })
})

contract("ERC20 Test", async (accounts)=>{
    before( async ()=>{
        account1 = accounts[0];
        account2 = accounts[1];

        // 최초 ERC20 토큰 지급
        await mp.ERC20_Provider(401, {from : account1});
        await mp.ERC20_Provider(401, {from : account2});
    })

    // ETH가 정상 지급된다. 
    it("#1. Truffle Token 정상 지급", async ()=>{
        const balAccount1 = await web3.eth.getBalance(account1);
        assert.ok(balAccount1 > 0, "account balance check");
    })

    // ERC20 지급 테스트
    it("#2. ERC20 토큰 정상 지급", async ()=>{
        // ERC20 토큰이 정상 지급된다. msg.sender는 각자의 계정으로 확인해야 함.
        const erc20_bal_account1 = await mp.getBalanceOfERC20(account1, {from : account1});
        const erc20_bal_account2 = await mp.getBalanceOfERC20(account2, {from : account2});
        assert.ok(erc20_bal_account1 == 100 && erc20_bal_account2 == 100 , "ERC20 token provided");
    })

    it('#3. ERC20 토큰 교환 (User to User)', async()=>{
        // 유저간 ERC20 토큰을 교환한다.
        await mp.ERC20_Transfer_User2User(account2, 5, {from : account1});
        // 교환 후 잔액 확인 테스트
        const erc20_bal_account1 = await mp.getBalanceOfERC20(account1, {from : account1});
        const erc20_bal_account2 = await mp.getBalanceOfERC20(account2, {from : account2});
        assert.ok(erc20_bal_account1 < 100, "Sending ERC20 Token Successfully");
        assert.ok(erc20_bal_account2 > 100, "Receiving ERC20 Token Successfully");
    })
})

contract("NFT 민팅/위탁/구매 테스트", async (acconts)=>{
    before( async()=>{
        // 최초 ERC20 토큰 지급
        await mp.ERC20_Provider(401, {from : account1});
        await mp.ERC20_Provider(401, {from : account2});
    })

    it("#1. NFT 민팅 테스트", async()=>{
        // acc1에서 NFT 민팅 진행
        await mp.createERC721Token("testTokenURI", 5, {from : account1});

        // NFT 소유권 확인(itemSeller + ownerOfNFT)
        const itemCount = await mp.itemCount();
        const ownerOf = await mp.getOwnerOfERC721(itemCount, {from : account1});
        const itemSeller = await mp.getItemSeller(itemCount, {from : account1});
        assert.ok(ownerOf == account1, "Maker of NFT owns NFTs");
        assert.ok(itemSeller == account1, "Maker of NFT can sell NFTs");
    })

    it('#2. NFT 위탁 판매', async ()=>{
        // NFT 발행자는 marketplace에 NFT 판매권을 양도한다.
        await mp.setAllNFTsToContract({from : account1});
        const isApproved = await mp.getIsApprovedForAll(account1, mp.address);

        // 정상 위탁 되었는지 확인
        assert.ok(isApproved, "Marketplace has right to sell NFTs");
    })

    it('#3. NFT 구매기능', async () => {
        // acc1이 발행한 NFT를 acc2가 구매한다.
        const itemCount = await mp.itemCount();
        await mp.buyERC721Token(itemCount, {from : account2});

        // acc2로 소유권이 이전되야 함.
        const itemSeller = await mp.getOwnerOfERC721(itemCount, {from : account2});
        const ownerOf = await mp.getItemSeller(itemCount, {from : account2});

        assert.ok(ownerOf == account2, "Maker of NFT owns NFTs");
        assert.ok(itemSeller == account2, "Maker of NFT can sell NFTs");
    })

    it("#4. NFT 재구매 테스트", async () => {
        // 소유자인 acc2는 marketplace에 NFT를 다시 위탁한다.
        await mp.setAllNFTsToContract({from : account2});
        // acc1은 tokenID=1 NFT를 구매한다.
        const itemCount = await mp.itemCount();
        await mp.buyERC721Token(itemCount, {from : account1});
        // 소유권을 확인한다.
        const itemSeller = await mp.getOwnerOfERC721(itemCount, {from : account1});
        const ownerOf = await mp.getItemSeller(itemCount, {from : account1});

        assert.ok(ownerOf == account1, "Maker of NFT owns NFTs");
        assert.ok(itemSeller == account1, "Maker of NFT can sell NFTs");
        
    })
    
        

})