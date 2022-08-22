import React, { useState, useEffect } from "react";
import "../css/App.css";

import { auth, db } from "./firebase";
// component
import LeftMenu from '../components/LeftMenu';
import RightMenu from "../components/RightMenu";
import UploadMessage from "../components/UploadMessage";
import Board from "../components/Board";
import Modal_Signin from "../components/Modal_Signin";
import Modal_Signup from "../components/Modal_Signup";
import Header from "../components/Header";
import BoardUpload from "../components/BoardUpload";
import Story from "../components/Story";

export default function MainPage(){
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
  

    // 이펙트 상태 
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // user has logged in...
          console.log(authUser);
          setUser(authUser);
        } else {
          // user has logged out...
          setUser(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, [user, username]);
  
    useEffect(() => {
      db.collection("posts").onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
    }, []);
  

    return (
      <div className="App">
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
        {/* 상단 바 (헤더) */}
        <Header
         par_setOpenSignIn={_setOpenSignIn}
         par_setOpen={_setOpen}
         par_user={user}
         />

        {/*왼쪽 메뉴 컴포넌트*/}
        <LeftMenu/>

        {/*오른쪽 메뉴 컴포넌트*/}
        <RightMenu/>

        {/*상단 스토리 메뉴 컴포넌트*/}
        <Story/>

        {/*중단 메뉴 컴포넌트*/}
        <BoardUpload username = {"ㅁㄴㅇㅁㄴㅇㅁㄴㅇ"} />
        {/* { user?.displayName ? (
          <BoardUpload username = {user.displayName} />
        ) : (<UploadMessage par_setOpenSignIn={_setOpenSignIn}/>)} */}
        
        {/* 게시판 불러오기 */}
        <Board par_posts={posts} par_user={user}/>
  
    
      </div>
    );
}