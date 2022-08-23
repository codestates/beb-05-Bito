const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/7ea55eb19f3c4887a39e9f078d47f212";
// const rpcURL = "http://127.0.0.1:8545"
// const web3 = new Web3(rpcURL);
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
const Contract = require("web3-eth-contract");
const { abi, address } = require("./contractInfo");

// const account1 = "0xEFAb267AE6deb0d88576283Abc145f14DCAFDf79";
// const account2 = "0x7C21d996E69207a08A581911B7BB4DF2870144d0";

const account1 = web3.eth.getAccounts()[0];
const account2 = web3.eth.getAccounts()[1];

async function balTest() {
  const bal1 = await web3.eth.getBalance(account1);
  const bal2 = await web3.eth.getBalance(account2);
  const tx1 = await web3.eth.getTransaction(
    "0x0a5e9103b28c2bc137e3012dd7b485d85214c5beb701b2c0ff8d7aa6d59cf72f"
  );
  console.log(bal1);
  console.log(bal2);
  console.log(tx1);
}
const accountEth = "0xEFAb267AE6deb0d88576283Abc145f14DCAFDf79"

// balTest();
web3.eth.getBalance(accountEth)
  .then(result=>{
    console.log(result);
  })

const contract = new web3.eth.Contract(abi, address)
contract.methods
  .token20Name()
  .call()
  .then((result) => {
    console.log(result);
  });

  contract.methods
  .getTokenURIERC721(1)
  .call()
  .then((result) => {
    console.log(result);
  });
  contract.methods
  .itemCount()
  .call()
  .then((result) => {
    console.log(result);
  });

  

// contract.methods
//   .contractName()
//   .call()
//   .then((result) => console.log(result));

// web3.eth.getAccounts().then((result) => console.log(result));

// contract.methods.ERC20_Provider(101).send({from:account1, gas : 3000000})
// .on('confirmation', (confirmNum, receipt)=>{
//     console.log(confirmNum);
// })

// // 최초 토큰 지급
// const erc20_test = async () => {
//     // contract.methods.ERC20_Provider(401).send({from : account1})
//     // .on('error', function(err){console.log(err)})
//     // .on('transactionHash', function(transactionHash){console.log(transactionHash)})
//     // const bal = await contract.methods.getBalanceOfERC20(account1).send({from : account1});
//     // console.log(bal);
//     const temp = await contract.methods.itemCount().call();
//     console.log(contract._address);
// }
// erc20_test();

// // using the callback
// myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash){
//     ...
// });

// // using the promise
// myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
// .then(function(receipt){
//     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
// });

// // using the event emitter
// myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
// .on('transactionHash', function(hash){
//     ...
// })
// .on('confirmation', function(confirmationNumber, receipt){
//     ...
// })
// .on('receipt', function(receipt){
//     // receipt example
//     console.log(receipt);
//     > {
//         "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
//         "transactionIndex": 0,
//         "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
//         "blockNumber": 3,
//         "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
//         "cumulativeGasUsed": 314159,
//         "gasUsed": 30234,
//         "events": {
//             "MyEvent": {
//                 returnValues: {
//                     myIndexedParam: 20,
//                     myOtherIndexedParam: '0x123456789...',
//                     myNonIndexParam: 'My String'
//                 },
//                 raw: {
//                     data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
//                     topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
//                 },
//                 event: 'MyEvent',
//                 signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
//                 logIndex: 0,
//                 transactionIndex: 0,
//                 transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
//                 blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
//                 blockNumber: 1234,
//                 address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
//             },
//             "MyOtherEvent": {
//                 ...
//             },
//             "MyMultipleEvent":[{...}, {...}] // If there are multiple of the same event, they will be in an array
//         }
//     }
// })
// .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
//     ...
// });
