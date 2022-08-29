import React, { useState } from "react";
import {SetFollowing} from "../api/SetFollowing";
import {SetUnFollowing} from "../api/SetUnFollowing";
import { GetAllUser } from "../api/GetAllUser";
import "../css/Suggested.css"

function RightMenuItem(props){

    const {user, userList, followIndex} =props;
    const [findex,setFindex]= useState(followIndex);
    const rdx = Math.floor(Math.random() * 5);

    function CallSetFollowing(flag){
        if(flag==1){ // 언팔
            SetUnFollowing(user.id,userList._id).then(()=>{
                setFindex(0);
            });
        }else{ // 팔 
            SetFollowing(user.id,userList._id).then(()=>{
                setFindex(1);
            })
        }
    }

    const icons = [
        {
          ava:
            "https://mumbaimirror.indiatimes.com/photo/68636148.cms",
        },
        {
          ava:
            "https://www.filmibeat.com/img/popcorn/profile_photos/shahid-kapoor-20190619173815-177.jpg",
        },
        {
          ava:
            "https://m.media-amazon.com/images/M/MV5BMjMwZjhjOTUtNmVjNS00NTM1LWEwOTItN2ZlMzMwMGY5ZGQ2XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_.jpg",
        },
        {
          ava:
            "https://images.newindianexpress.com/uploads/user/imagelibrary/2018/12/19/original/accidental.jpg",
        },
        {
          ava:
            "https://www.skinillustrator.com/wp-content/uploads/2018/09/got-logo.jpg",
        },
      ];

    return(
        <div>
            <div className="footer">
                <div className="MuiAvatar-root MuiAvatar-circular makeStyles-large-3" displayname="avatar"><img alt="Bhuban_Bam" src={icons[rdx].ava} className="MuiAvatar-img"/></div>
                <div className="footer_content">
                    <h5>{userList.username}</h5>
                </div>
                <a onClick={() => CallSetFollowing(findex)}>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-text footer_follow MuiButton-textSecondary MuiButton-textSizeSmall MuiButton-sizeSmall" tabIndex="0" type="button">
                        <span className="MuiButton-label">{findex == 1 ? "UnFollow":"Follow"}</span>
                        <span className="MuiTouchRipple-root"></span>
                    </button>
                </a>
            </div>
    </div>
    );
}

export default RightMenuItem;