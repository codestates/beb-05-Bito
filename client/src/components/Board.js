//게시판
import React, { useState, useEffect} from "react";
import "../css/Post.css"
import Post from "../components/Post.js"
import {GetBoardList} from "../api/GetBoardList";

function Board(props)
{ // userName 추가해야함 displayName
  const {user,userId} = props;
  const [posts,SetPosts] = useState([]);

  async function fetchData(){
    const result = await GetBoardList(userId);
    SetPosts(result);
    console.log(userId)
  }
  // 최초 실행시만 
  useEffect((e) => {
    fetchData();
    // 클린업 componentWillUnmount

  },[]);

    return (
      posts.reverse().map((obj, idx) =>(
        <Post
          key={obj._id}
          username={obj.userName}
          contents={obj.comment}
          imgUrl={obj.imgUrl} 
        />
      ))
  
    );

}

export default Board; 