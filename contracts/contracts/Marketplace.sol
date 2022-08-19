// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

import "./ERC-20.sol";
import "./ERC-721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace{
    /*
        1. ERC20, ERC721 컨트랙트 연결
        2. ERC20 보상지급
        3. ERC20 유저간 교환 기능
        4. NFT 발행
    */

    // 상태 변수
    ERC20Token token20;
    ERC721Token token721;
    uint256 public itemCount;
    uint8 tokenBenefit;
    uint256 fee;

    uint256 public tokenCnt;

    // 생성자 함수
    // constructor(address _ERC20Addr, address _ERC721Addr){
    //     setERC20Token(_ERC20Addr);
    //     setERC721Token(_ERC721Addr);
    //     tokenBenefit = 10;
    //     fee = 3;
    // }
    constructor(){
        tokenBenefit = 10;
        fee = 3;
        token20 = new ERC20Token();
        token721 = new ERC721Token();
    }

    /*
     * @ dev : Marketplace에 민팅된 NFTs
     * @ Desc : Marketplace에 민팅된 NFTs
    */
    struct NFT_List{
        int itemId;
        string tokenURI;
        int price;
        address payable seller;
        bool sold;
    }

    mapping(int => NFT_List) items;

    event Token20Set(
        ERC20Token token,
        address tokenAddress,
        bool result
    );

    event Token721Set(
        ERC721Token token,
        address tokenAddress,
        bool result
    );
    
    event TokenBenefitSuccess(
        address actor,
        uint amount,
        bool result
    );

    event NFTOffered(
        int itemId,
        string tokenURI,
        int price,
        address indexed seller
    );

    event NFTBought(
        int itemId,
        string tokenURI,
        int price,
        address indexed seller,
        address indexed buyer
    );

    /*
     * @ dev : ERC-20 연결
     * @ Desc : Marketplace 컨트랙트에서 ERC20 토큰을 사용하기 위한 연결작업 
    */
    function setERC20Token(address _tokenAddress) public returns(bool){
        require(_tokenAddress != address(0x0));
        token20 = ERC20Token(_tokenAddress);

        emit Token20Set(token20, _tokenAddress, true);

        return true;
    }

    
    /*
     * @ dev : ERC-721 연결
     * @ Desc : Marketplace 컨트랙트에서 ERC721 토큰을 사용하기 위한 연결작업 
    */
    function setERC721Token(address _tokenAddress) public returns(bool){
        require(_tokenAddress != address(0x0));
        token721 = ERC721Token(_tokenAddress);

        emit Token721Set(token721, _tokenAddress, true);
        return true;
    }

    /*
     * @ dev : ERC-721 연결 확인
     * @ Desc : ERC721Token 컨트랙트를 배포한 후 주소를 입력하여 Marketplace 컨트랙트에 ERC721 컨트랙트가
                정상적으로 연결됨을 확인한다. 
    */
    function getName721() public view returns(string memory){
        string memory result = token721.name();
        return result;
    }

    
    /*
     * @ dev : ERC-20 연결 확인
     * @ Desc : ERC20Token 컨트랙트를 배포한 후 주소를 입력하여 Marketplace 컨트랙트에 ERC20 컨트랙트가
                정상적으로 연결됨을 확인한다. 
    */
    function getName20() public view returns(string memory){
        string memory result = token20.name();
        return result;
    }

    /*
     * @ dev : ERC-20 토큰 교환
     * @ Desc : 유저끼리 ERC20 토큰을 교환할 수 있다. 송신 유저는 자신이 보유하고 있는 토큰 이상의 토큰을 
                전송할 수 없다.
    */
    function ERC20_Transfer_User2User(address _to, uint256 _amount) public payable returns(bool){
        require(_to != address(0x0));
        require(_amount > 0 && token20.balanceOf(msg.sender) >= _amount);

        token20.exchangeERC20(msg.sender, _to, _amount);

        return true;
    }

    /*
     * @ dev : ERC-20 토큰 지급
     * @ Desc : 유저가 글을 발행하거나, NFT를 발행하는 등 토큰 이코노미에 부합하는 action을 취했을 때 
     *           컨트랙트로 부터 토큰이 지급된다. 
    */

    function ERC20_Provider(address _to) public payable returns(bool){
        require(_to != address(0x0));

        token20.transferERC20(_to, tokenBenefit);
        
        emit TokenBenefitSuccess(_to, tokenBenefit, true);
        return true;
    }

    /*
     * @ dev : ERC-721 Item Creation
     * @ Desc : 유저는 본인이 가진 ERC20 토큰으로 NFT를 발행할 수 있다.
     * @ Requirements : 
            - Node.js에서 setApproveForAll() 함수를 실행해서, Marketplace 컨트랙트에 위임해야됨
            - NFT 민팅 createERC721Token() 실행하여 Marketplace에서 관리하는 NFT 추가 필요
    */
    function createERC721Token(string memory _tokenURI, int _price) public returns(bool){
        itemCount++;

        tokenCnt = token721.mintNFT(_tokenURI);

        items[int(itemCount)] = NFT_List(int(itemCount), _tokenURI, _price, payable(msg.sender), false);

        emit NFTOffered(int(itemCount), _tokenURI, _price, msg.sender);

        return true;
    }

   
    /*
     * @ dev : ERC-721 구매
     * @ Desc : 유저는 본인이 가진 ERC20 토큰으로 NFT를 구매할 수 있다.
    */

    function buyNFT(int _itemId) external payable {
        NFT_List memory item = items[_itemId];

        require(token20.balanceOf(msg.sender) > getTotalPrice(_itemId));
        require(msg.sender != items[_itemId].seller);
        require(_itemId > 0 && _itemId <= int(itemCount));

        // 1. 구매자는 컨트랙트에 fee를 포함한 금액을 가지고 있어야 함.
        // 2. 구매자가 보유한 ERC20 토큰은 seller에게 전송됨
        token20.exchangeERC20(msg.sender, items[_itemId].seller, uint256(items[_itemId].price));
        // 3. Marketplace 컨트랙트에 Fee를 내야함.
        token20.transferERC20(address(this), uint256(items[_itemId].price)*fee/100);
        // 4. NFT Token의 소유권을 구매자로 변경
        // token721.transferFrom(address(this), msg.sender, uint256(_itemId));

        emit NFTBought(_itemId, items[_itemId].tokenURI, items[_itemId].price, items[_itemId].seller, msg.sender);
    }

    
    /*
     * @ dev : NFT Item Total Price
     * @ Desc : fee와 NFT 가격을 포함한 NFT 구매시 필요한 총액을 반환
    */
    function getTotalPrice(int _itemId) public returns(uint256){
        uint256 totalPrice = uint256(items[_itemId].price) * (fee + 100) / 100;

        return totalPrice;
    }


    function getAllItems() public returns(NFT_List[] memory){
        NFT_List[] memory data;

        for(int i=1; i<=int(itemCount); i++){
            data[uint256(i)] = items[i];
        }


        return data;
    }
}