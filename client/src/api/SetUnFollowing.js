import axios from 'axios';
import * as global from '../Global';

export async function SetUnFollowing(currentId,targetId) {
    try {
        const res = await axios.put(global.BASE_URL+"api/user/unfollow/"+currentId,{
            userId: targetId,
        });
        return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }
