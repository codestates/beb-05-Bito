const Web3 = require("web3")
// const rpcURL = "https://ropsten.infura.io/v3/8bcf24fad93341fd9e58dde29957446c";


function getWeb3(){
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8501'));
    return web3;
}

const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts", // connect to metamask wallet
    });

    setAccount(accounts[0]);
    web3.eth.getBalance(accounts[0]).then((bal)=>{
      setBalance(parseFloat(web3.utils.fromWei(bal,'ether')).toFixed(5))
    })
  }
  
exports.main_get = async(req,res,next) =>{
    try{
        res.status(200).send("Hello world")
        const accounts = await getWeb3().eth.getAccounts();
        const serverAddress = accounts[0];
        console.log('account', accounts[0])


    } catch(e){
        throw Error(e)
    }
}