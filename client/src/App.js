
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import "./css/App.css";
import MainPage from './pages/MainPage';
import Market from './pages/Market';
import Mypage from './pages/MyPage';
import GoogleRedirect from './pages/GoogleRedirect';

import Header from "./components/Header";
import Modal_Signin from "./components/Modal_Signin";
import Modal_Signup from "./components/Modal_Signup";
import Web3 from "web3";
import {AccountContext} from './context/accountContext';

export default function App (props) {
  // 마지막 * 경로는 잘못된 경로 모든 메인페이지로 돌리는 라우팅 
      const search = window.location.search;
      const params = new URLSearchParams(decodeURIComponent(search));
      const displayName = params.get('displayName'); // bar
      const _email = params.get('email');

      const [openSignIn, setOpenSignIn] = useState(false);
      const [posts, setPosts] = useState([]);
      const [open, setOpen] = useState(false);

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [user, setUser] = useState(null); // 세션 정보 
      const [web3,setWeb3] = useState();
      const [account,setAccount] = useState([]); // web3 계정 정보 
    
      //로그인창 오픈 
      const _setOpenSignIn = (value) => {
        setOpenSignIn(value);
      }
      const _setEmail = (value) => {
        setEmail(value)
      }
      const _setPassword = (value) => {
        setPassword(value)
      }
      const _setOpen = (value) =>{
        setOpen(value)
      }
      const _setUsername = (value) =>{
        setUsername(value)
      }

      useEffect(() => {
        const getUser = () => {
          fetch("http://localhost:4000/api/auth/login/success", {
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
            console.log(resObject);
            setUser(resObject.user);
          })
          .catch((err) => {
            console.log(err);
          });
        };
        getUser();
        
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
          try {
              const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
              console.log(web);
              setWeb3(web); // web3 객체 업데이트
          } catch (err) {
              console.log(err);
          }
        }

      }, []);

      //wallet state check 
      useEffect(() => {
     
      });


  return (
    <BrowserRouter>
     <AccountContext.Provider value={{account, setAccount}}>
      <Header 
        par_setOpenSignIn={_setOpenSignIn}
        par_setOpen={_setOpen}
        par_user={user}
        web3={web3}
      />
      {/* 로그인 팝업 */}
      <Modal_Signin 
        par_openSignIn={openSignIn} 
        par_setOpenSignIn={_setOpenSignIn}
        par_email={email}
        par_setEmail={_setEmail}
        par_password={password}
        par_setPassword={_setPassword}
      />
        
        {/* 회원 가입 팝업  */}
      <Modal_Signup
        par_open={open}
        par_setOpen={_setOpen}
      />

      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/market' element={<Market/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/googlere' element={<GoogleRedirect/>} {...props} />
        <Route path="*" element={<MainPage /> }/> 
      </Routes>
      </AccountContext.Provider>
    </BrowserRouter>
  );

}
