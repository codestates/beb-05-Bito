import axios from 'axios';
import * as global from '../Global';

// 모든 유저 정보 불러옴 
export async function GetAllUser(userId) {
    try {
        console.log(userId)
      const res = await axios.get(global.BASE_URL+"api/user/all/list/"+userId)
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }