import * as global from '../Global';
import abi from "../ERCBito";

export function ERC_GetToken(web3,account) { 

    try {
      var token;
      const contractAddr = global.CONTRACT_URL;
      const instance = new web3.eth.Contract(abi,contractAddr);
      return instance.methods.getBalanceOfERC20(account).call().then(result => {
          return result;
      }).then((result)=>{
        return result;
      })

    } catch (error) {
      throw new Error(error);
    }
  }