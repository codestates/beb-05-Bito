
import axios from 'axios';
import * as global from '../Global';

export async function SetUserAddress(userId,addr) {
    try {
        const res = await axios.put(global.BASE_URL+"api/user/"+userId,{
            userId: userId,
            address: addr
        });
        return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }
