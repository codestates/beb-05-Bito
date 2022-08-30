import axios from 'axios';
import * as global from '../Global';

export async function GetBoardList(userId) {
    try {
      console.log("run")
      //630496a9b27dd713313652eb
      const res = await axios.post(global.BASE_URL+"api/post/feed/all",{
        userId: userId
      });
      console.log(res.data)
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }