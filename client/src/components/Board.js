//게시판
import React, { useState } from "react";
import "../css/Post.css"
import Post from "../components/Post.js"

function Board(props){
  const { par_postsA, par_userA } = props;

    return (
      par_postsA.map(({ id, post }) => (
        <Post
          key={id}
          postId = {id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          avatar={post.avatar}
          user = {par_userA}
        />
      ))
    );

}

export default Board; 