import React, { useState } from "react";
import "../css/App.css";
// component
import LeftMenu from '../components/LeftMenu';
import RightMenu from "../components/RightMenu";
import UploadMessage from "../components/UploadMessage";
import Board from "../components/Board";
import BoardUpload from "../components/BoardUpload";
import Story from "../components/Story";
import { useContext } from "react";
import {AccountContext} from '../context/accountContext';
import {SetUserAddress} from "../api/SetUserAddress";

export default function MainPage(props){
    const {user, setOpenSignIn, userId, web3} = props;
    const {account, setAccount} = useContext(AccountContext);
    
    return (
      <div className="App">
        {/*왼쪽 메뉴 컴포넌트*/}
        <LeftMenu/>

        {/*오른쪽 메뉴 컴포넌트*/}
        <RightMenu/>

        {/*상단 스토리 메뉴 컴포넌트*/}
        <Story/>

        {/*중단 메뉴 컴포넌트*/}
        { (user != null) && (account.length != 0) ? (
          <BoardUpload user={user} web3={web3} />
        ) : (<UploadMessage setOpenSignIn={setOpenSignIn}/>)}
        
        {/* 게시판 불러오기 */}
        { (user != null) ? (<Board user={user} userId={userId}/>) : ""}
        
      </div>
    );
}