require("dotenv").config();
const Web3 = require("web3")
const cron = require("node-cron")
const { MongoClient, ConnectionClosedEvent } = require("mongodb");

console.log()
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8501'))

// 노드의 최신블록넘버 조회
const getLatestBlock = async() => {

    web3.eth.getBlockNumber(function (err, num){

        // blockInfo(num).then(console.log)
        web3.eth.getBlock(num, function(err,tx){
            console.log(tx.hash, num)
            save2db(tx,num)
        })
        // console.log(blockInfo(num).transactions)
        // console.log(blockInfo(num).hash)

        // console.log(tx.hash)
        // (function(tx_hash){

        //     web3.eth.getTransaction(tx_hash).then(console.log)
        //     // web3.eth.getTransaction(tx_hash, function(err, tx){
        //     //     save2db(tx,num)
        //     // })
        // })
    })

}
const blockInfo = async (num) => await web3.eth.getBlock(num);
const txInfo = async (tx) => await web3.eth.getTransaction(tx);
const client = new MongoClient(process.env.DATA_BASE_URL); 
const db = client.db(process.env.DATA_BASE_NAME);
const collection_nft = db.collection('nft');
// // db 저장 - how?
const save2db = async(tx,num) =>{
    const doc = {
        _id : "2",
        user_id : "2",
        tx_hash : tx.hash,
        token_id : num,
      }
    const result = await collection_nft.insertOne(doc);
    console.log(result)
    return result;
}

const task = cron.schedule(
    "* * * * *",
    async () =>{
        // 주기적으로
        // let num = getLatestBlock()
        getLatestBlock()
        // let block = blockInfo(num)
        // let tx = txInfo(block.transactions)
        // save2db(tx,num)
        // 예시
    },
    {
        scheduled: false,
    }
);

task.start();