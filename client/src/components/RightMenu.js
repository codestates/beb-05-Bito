import React, { useState, useEffect} from "react";
import "../css/Suggested.css"
import RightMenuItem from "./RightMenuItem";
import {GetAllUser} from "../api/GetAllUser";

function RightMenu(props){
    const {user, userId} = props;
    const [userList,SetuserList] = useState([]);
    const _SetuserList = (value) =>{
        SetuserList(value);
    }

    async function fetchData(){
        const result = await GetAllUser(user.id);
        SetuserList(result.users);
    }
    // 최초 실행시만 
    useEffect((e) => {
        fetchData();
    },[]);
    
    const FollowCheck = (value)=>{
        if(value.followings.includes(user.id))
            return 1;
        else
            return 0;
    }

   return(
    <div className="suggested">
          <h4>
              <svg className="MuiSvgIcon-root suggested_icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
              친구 추천</h4>
          <p>현재 접속중인 친구들 목록 입니다. 피드가 마음에 들면 친구 요청을 해보세요!</p>
            {userList.map((value,index) =>(
                <RightMenuItem
                    key={index}
                    user={user}
                    userList={value}
                    followIndex={FollowCheck(value)}
                    setUserList={_SetuserList}
                />
            ))
            }
          <a onClick="">
              <button className="MuiButtonBase-root MuiButton-root MuiButton-text footer_follow_main MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall" tabIndex="0" type="button">
                  <span className="MuiButton-label">See All</span>
                  <span className="MuiTouchRipple-root"></span>
              </button>
          </a>
        </div>
   );

}
export default RightMenu;

// if(value.followings.includes(user.id)){
//     return (<RightMenuItem
//         key={index}
//         user={user}
//         userList={userList}
//         followIndex={1}
//         followMsg={"unFollow"}
//     />)
// }else{
//     return (<RightMenuItem
//         key={index}
//         user={user}
//         userList={userList}
//         followIndex={0}
//         followMsg={"Follow"}
//     />)
// }