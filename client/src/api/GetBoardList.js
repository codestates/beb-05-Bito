import axios from 'axios';
import * as global from '../Global';

export async function GetBoardList(userId) {
    try {
      //630496a9b27dd713313652eb
      const res = await axios.post(global.BASE_URL+"api/post/feed/all/",{
        userId: userId
      });
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }