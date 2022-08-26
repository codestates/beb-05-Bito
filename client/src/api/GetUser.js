import axios from 'axios';
import * as global from '../Global';

export async function GetUser() {
    try {
        var data;
        await fetch(global.BASE_URL+"api/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then((response) => {
        if (response.status === 200) return response.json();
          throw new Error("authentication has been failed");
        })
        .then((resObject) => {
          data = resObject.user;
        })
        .catch((err) => {
          console.log(err);
        });
        return data;
    } catch (error) {
      throw new Error(error);
    }
  }