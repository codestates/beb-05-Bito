import * as global from '../Global';
import abi from "../ERCBito";

export function ERC_SendToken(web3,account,target,amount) { //401최조,101게시글작성

    try {
        const contractAddr = global.CONTRACT_URL;
        const instance = new web3.eth.Contract(abi,contractAddr)
        return instance.methods.ERC20_Transfer_User2User(target,amount).send({from:account}).then(result => {
          return result;
        });
    
    } catch (error) {
      throw new Error(error);
    }
  }