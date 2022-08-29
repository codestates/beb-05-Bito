import axios from 'axios';
import * as global from '../Global';

export async function LocalSignUp(username,password,email) {
    try {
        const res = await axios.post(global.BASE_URL+"api/auth/signup",{
            username: username,
            email: email,
            password: password
        });
        return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }