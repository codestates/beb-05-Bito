import axios from 'axios';
import * as global from '../Global';

export async function SetCreatePost(userId,userName,file,comment) {
    try {
        const frm = new FormData()
        frm.append('userId', userId)
        frm.append('comment', comment)
        frm.append('userName', userName)
        frm.append('imgName', file.name)
        frm.append('file', file)

        const res = await axios.post(global.BASE_URL+"api/post/2",frm,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }