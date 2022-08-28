import * as global from '../Global';
import abi from "../ERCBito";

export async function ERC_SetToken(web3,code,account) { //401최조,101게시글작성

    try {
        const contractAddr = global.CONTRACT_URL;
        const instance = new web3.eth.Contract(abi,contractAddr)
        instance.methods.ERC20_Provider(code).send({from:account}).then(result => {
          console.log(result);
          return result;
        });
    
    } catch (error) {
      throw new Error(error);
    }
  }