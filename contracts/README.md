# Contract 기능

## 구성

- ERC20Token Contract : ERC20 토큰 발행
- ERC721Token Contract : ERC721 토큰 발행
- Marketplace Contract : Marketplace 관리

## 필요기능

1. ERC20_Provider()
    - 사용자가 게시글을 발행한 경우 보상으로 토큰 지급
    - 사용자가 댓글을 다는 경우 보상으로 토큰 지급
    - 게시글 하나당 10 토큰 지급(수정가능)
    - 댓글 하나당 1토큰 지급(수정가능)

2. ERC20_Transfer_User2User()
    - 사용자들은 서로 ERC20 토큰을 주고 받을 수 있다.

3. createERC721Token()
    - 사용자는 본인이 가진 ERC20 토큰을 사용해 NFT를 발행할 수 있다.
    - ERC721URIStorage 사용하여 tokenURI를 설정한다.
    - Marketplace 컨트랙트는 `spender` 역할을 수행한다.

4. buyERC721Token()
    - 사용자는 본인이 가진 ERC20 토큰을 사용해 NFT를 구매할 수 있다.
    - NFT 구매시 `fee`를 포함한 가격을 지불해야 한다.

5. getTotalPrice()
    - `fee`를 포함한 NFT 구매시 필요한 `total price`를 반환합니다.

6. getBalanceOfERC20(address)
    - 해당 계정의 ERC20 잔액을 반환합니다.

7. getOwnerOfERC721(uint256)
    - NFT의 소유자를 반환합니다.

8. getIsApprovedForAll(address owner, address spender) return(bool)
    - owner가 spender에게 NFT 판매권을 양도했는지 여부를 반환합니다.

9. getTokenURIERC721(int itemId) return(string)
    - 해당 item의 tokenURI를 반환합니다.

10. itemCount()
    - 발행된 전체 NFT의 갯수를 반환한다.

11. setERC20Token(address _tokenAddress)
    - 배포된 ERC20 토큰 주소로 설정
    - 기본 설정되어있으므로, 추가로 설정할 필요는 없음.

12. setERC721Token(address _tokenAddress)
    - 배포된 ERC721 토큰 주소로 설정
    - 기본 설정되어있으므로, 추가로 설정할 필요는 없음.

13. token20Name() / token721Name()
    - 컨트랙트에 설정된 이름 반환

14. token20Symbol() / token721Symbol()
    - 컨트랙트 symbol 반환
    