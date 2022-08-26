import axios from 'axios';
import * as global from '../Global';

export async function GetUser(par_userId) {
    try {
      //630496a9b27dd713313652eb
      const res = await axios.get(global.BASE_URL+"api/auth/login/success/")
      console.log(res)
      return res.data;

    } catch (error) {
      throw new Error(error);
    }
  }

// const getUser = () => {
//     fetch("http://localhost:4000/api/auth/login/success", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//       },
//     })
//     .then((response) => {
//     if (response.status === 200) return response.json();
//       throw new Error("authentication has been failed");
//     })
//     .then((resObject) => {
//       console.log(resObject);
//       setUser(resObject.user);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };
//   getUser();