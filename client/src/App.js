
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
import {GetUserInfo} from "./api/GetUserInfo"
import Web3 from "web3";
import { DateRange } from '@material-ui/icons';


export default function App (props) {
      // 마지막 * 경로는 잘못된 경로 모든 메인페이지로 돌리는 라우팅      
      const [openSignIn, setOpenSignIn] = useState(false);
      const [open, setOpen] = useState(false);

      const [user, setUser] = useState();   // 로그인 유저 정보 
      const [account,setAccount] = useState([]); // web3 지갑 정보 (전역)
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
          console.log(data)
          setUser(data)
          if(data == null){
          }else{
            GetUserInfo(data.id).then((res)=>{
              if(res.address != 0){
                setAccount(res.address)
                console.log("이미 등록된 지갑")
              }
            })
          }
        })
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
          try {
              const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
              setWeb3(web); // web3 객체 업데이트
          } catch (err) {
              console.log(err);
          }
        }

      },[])
      // get Userinfo 
      // useEffect(() => {
      //   console.log(user)
      //   const result = GetUserInfo(user);
      //   console.log(result)
      // },[]);



  return (
    <BrowserRouter>
    <AccountContext.Provider value={{account, setAccount}}>
      <Header 
        par_setOpenSignIn={_setOpenSignIn}
        par_setOpen={_setOpen}
        user={user}
        setUser={_setUser}
        web3={web3}
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

      <Routes> {/* user != null 이렇게 사용하면 렌더링전에 데이터셋을 완료시키고 보낼수가있지*/}
        <Route path='/' element={(user != null) ? (<MainPage web3={web3} setOpenSignIn={_setOpenSignIn} user={user} userId={user.id}/>) : ""} />
        <Route path='/market' element={<Market/>}/>
        <Route path='/mypage' element={(user != null && account.length != 0) ? (<Mypage web3={web3} user={user}/>) : ""}/>
        {/* <Route path='/googlere' element={<GoogleRedirect/>} {...props} /> */}
        <Route path="*" element={<MainPage/> }/> 
      </Routes>
      </AccountContext.Provider>
    </BrowserRouter>

  );

}