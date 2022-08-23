
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import "./css/App.css";
import MainPage from './pages/MainPage';
import Market from './pages/Market';
import Header from "./components/Header";
import Modal_Signin from "./components/Modal_Signin";
import Modal_Signup from "./components/Modal_Signup";

export default function App () {
  // 마지막 * 경로는 잘못된 경로 모든 메인페이지로 돌리는 라우팅 
      const [openSignIn, setOpenSignIn] = useState(false);
      const [posts, setPosts] = useState([]);
      const [open, setOpen] = useState(false);

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");

      const [user, setUser] = useState(null);

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
      // 이펙트 최초 로그인 init
      useEffect(() => {
  
      }, [user, username]);
      // 이펙트 최초 게시물 init
      useEffect(() => {
  
      }, []);

  return (
    <BrowserRouter>
      <Header 
        par_setOpenSignIn={_setOpenSignIn}
        par_setOpen={_setOpen}
        par_user={user}
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
        par_username={username}
        par_setUsername={_setUsername}
        par_email={email}
        par_setEmail={_setEmail}
        par_password={password}
        par_setPassword={_setPassword}
      />

      <Routes>
        <Route path='/' element={<MainPage par_posts={posts} par_user={user}/>} />
        <Route path='/market' element={<Market/>}/>
        
        <Route path="*" element={<MainPage />} /> 
      </Routes>
    </BrowserRouter>

  );

}
