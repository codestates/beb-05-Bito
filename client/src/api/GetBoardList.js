import axios from 'axios';
import * as global from '../Global';

export async function GetBoardList(par_userId) {
    try {
      //630496a9b27dd713313652eb
      const res = await axios.post(global.BASE_URL+"api/post/feed/all/",{
        userId: "630496a9b27dd713313652eb"
      });
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }