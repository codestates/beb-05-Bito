
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import "./css/App.css";
import MainPage from './pages/MainPage';
import Market from './pages/Market';
import Mypage from './pages/MyPage';

import Header from "./components/Header";
import Modal_Signin from "./components/Modal_Signin";
import Modal_Signup from "./components/Modal_Signup";
import {AccountContext} from './context/accountContext';
import {GetUser} from "./api/GetUser";
import Web3 from "web3";


export default function App (props) {
      // 마지막 * 경로는 잘못된 경로 모든 메인페이지로 돌리는 라우팅      
      const [openSignIn, setOpenSignIn] = useState(false);
      const [open, setOpen] = useState(false);

      // 로그인 유저 정보 
      const [user, setUser] = useState(null);
      const [account,setAccount] = useState([]); // web3 계정 정보 (전역)
      const [web3,setWeb3] = useState();

      const _setOpenSignIn = (value) => {
        setOpenSignIn(value);
      }
      const _setOpen = (value) =>{
        setOpen(value);
      }
      const _setUser = (value) =>{
        setUser(value);
      }
    

      //렌더링시 한번 실행
      useEffect(() => {
        const result = GetUser();
        result.then(data =>{
          setUser(data)
        })
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
          try {
              const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
              console.log(web);
              setWeb3(web); // web3 객체 업데이트
          } catch (err) {
              console.log(err);
          }
        }

        console.log(user)
      }, []);

  return (
    <BrowserRouter>
    <AccountContext.Provider value={{account, setAccount}}>
      <Header 
        par_setOpenSignIn={_setOpenSignIn}
        par_setOpen={_setOpen}
        par_user={user}
        par_setUser={_setUser}
      />
      {/* 로그인 팝업 */}
      <Modal_Signin 
        par_openSignIn={openSignIn} 
        par_setOpenSignIn={_setOpenSignIn}
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
        {/* <Route path='/googlere' element={<GoogleRedirect/>} {...props} /> */}
        <Route path="*" element={<MainPage /> }/> 
      </Routes>
      </AccountContext.Provider>
    </BrowserRouter>

  );

}