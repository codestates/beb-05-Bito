import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "../css/Post.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";

import { Block } from "@material-ui/icons";
import testimg from "../assets/nfttestimg.png"

function Post({ username, contents }) {
  const [comments, SetComments] = useState([]);
  const [comment, SetComment] = useState("");
  const [likeCount,SetLikeCount] = useState(0); // 좋아요 갯수 

  // 매번 렌더링 될때마다 호출이 됨 =그러니깐 post자체가 렌더링 될때마다지 -> 여기서 댓글 관리 
  useEffect(() => {
   
  },[]);

  // 댓글 입력 API필요 아직 구현 ㄴㄴ
  const postComment = (event) => {
    event.preventDefault();

  
    SetComment("");
  };

  // 아바타는 살리고 
  const avatars = [
    {
      ava:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      ava:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    },
    {
      ava:
        "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg",
    },
    {
      ava:
        "https://i.pinimg.com/originals/76/80/4f/76804f67ba38f85e4802d250e5b15504.jpg",
    },
    {
      ava:
        "https://i.pinimg.com/originals/34/f2/50/34f250635ed02218356595ea6d730518.jpg",
    },
  ];

  const [avatar, setAvatar] = useState(0);

  return (
    <div className="post">
      {/* header => avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="subhampreet"
          src={avatars[avatar].ava}
        />
        <h3>{username}</h3>
        <div className="MoreHorizIcon" style={{left:"65%", float:"left"}}>
          <MoreHorizIcon />
        </div>
      </div>

      {/* 업로드 이미지 */}
      <img className="post__image" src={testimg} />

      {/* 좋아요 구독 공유 아이콘*/}
      <div className="likeShare">
        <FavoriteBorderIcon className="likeShare-item" fontSize="medium" />
        <ModeCommentOutlinedIcon className="likeShare-item" fontSize="medium" />
        <NearMeOutlinedIcon className="likeShare-item" fontSize="medium" />
        <TurnedInNotOutlinedIcon
          className="likeShare-item-save"
          fontSize="medium"
          
        />
      </div>
      {/* 좋아요 갯수 */}
      <div className="post_comments">
        <h5 className="comment">
          좋아요 {likeCount}개
        </h5>
      </div>
   
      {/* 작성자와 작성글 내용 */}
      <h7 className="post__text" style={{display:Block}}>
        {" "}
        <strong>{username} </strong>
      </h7>
      <div className="post_comments" style={{borderBottom:"1px solid lightgray"}}>
        <h5 className="comment">
          {contents}
        </h5>
      </div>

      {/* 댓글*/}
      {/* <div className="post_comments" style={{marginTop:20}}>
        {comments.map((comment) => (
          <h5 className="comment">
            <strong>{comment.username}</strong> {comment.text}
          </h5>
        ))}
      </div> */}

      {/* 로그인한 사람만 보임 == 댓글 기능*/}
      {/* {user && (
        <form className="postComment_Box">
          <input
            className="comment_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
          />
          <Button
            color="secondary"
            className="comment_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )} */}
    </div>
  );
}

export default Post;
