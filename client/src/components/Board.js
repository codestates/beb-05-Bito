//게시판
import React, { useState, useEffect} from "react";
import "../css/Post.css"
import Post from "../components/Post.js"
import {GetBoardList} from "../api/GetBoardList";

function Board(props)
{ // userName 추가해야함 displayName
  const {user} = props;
  const [posts,SetPosts] = useState([]);
  const tmp_userName = "임시 사용자" // 나중에  구글 닉네임으로 ㄱ 
  console.log(user)

  async function fetchData(){
    const result = await GetBoardList(user.id);
    SetPosts(result);
    console.log(posts)
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
          username={tmp_userName}
          contents={obj.comment}
        />
      ))
      // posts.map(({ asset, index }) => (
      //   console.log(asset[index])
      //   // <Post
      //   //   key={asset._id}
      //   //   postId = {asset._id}
      //   //   username={index}
      //   //   caption={index}
      //   //   imageUrl={index}
      //   //   avatar={index}
      //   //   user = {par_userA}
      //   // />
      // ))
    );

}

export default Board; 