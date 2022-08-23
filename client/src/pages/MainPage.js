import "../css/App.css";
// component
import LeftMenu from '../components/LeftMenu';
import RightMenu from "../components/RightMenu";
import UploadMessage from "../components/UploadMessage";
import Board from "../components/Board";
import BoardUpload from "../components/BoardUpload";
import Story from "../components/Story";

export default function MainPage(props){

    const {par_posts, par_user} = props;

    return (
      <div className="App">
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
        <Board par_posts={par_posts} par_user={par_user}/>
  
    
      </div>
    );
}