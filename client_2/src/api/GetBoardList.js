import axios from 'axios';
import * as global from '../Global';

export async function GetBoardList(par_userId) {
    try {
    
      const res = await axios.get(global.BASE_URL+"api/post/feed/all/"+"630496a9b27dd713313652eb");
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }