import axios from 'axios';
import * as global from '../Global';

export async function LocalSignIn(par_userId) {
    try {
        axios({
            url: "http://localhost:4000/api/auth/local",
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              email: email,
              password: password,
            },
            withCredentials : true,
          }).then(result=>{
            if(result.status === 200){
              try {
                navigate('/');
              } catch (error) {
                console.error(error);
              }
            }else{
              navigate('/login')
            }
          })
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }