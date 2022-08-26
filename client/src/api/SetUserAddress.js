
import axios from 'axios';
import * as global from '../Global';

export async function SetUserAddress() {
    try {
        const userId = "6308516e23fcb1f611f21334";
        const wallet = "bbbbbb";
        const res = await axios.put(global.BASE_URL+"api/user/"+userId,{
            userId: userId,
            address: wallet
        });
        return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }
