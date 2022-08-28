import axios from 'axios';
import * as global from '../Global';

export async function GetUserInfo(userId) {
    try {
      //630496a9b27dd713313652eb
      const res = await axios.get(global.BASE_URL+"api/user/"+userId)
      console.log(res.data)
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }