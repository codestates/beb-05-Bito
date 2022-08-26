
// assets
import SearchIcon from "@material-ui/icons/Search";
import mainLogo from "../assets/mainLogo.png";
import mypageIcon from "../assets/mypageIcon.png"
import markgetIcon from "../assets/marketIcon.png"
import HomeIcon from '@material-ui/icons/Home';
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import "../css/Google.css";


function Header(props){
    const {par_user, par_setOpenSignIn, par_setOpen} = props;
    return (
        
        <div className="app__header">
        <img
          className="app__headerImage"
          src={mainLogo}
          alt=""
        />

        <div className="searchForm">
          <form>
            <SearchIcon className="searchIcon" fontSize="small" />
            <input type="text" id="filter" placeholder="Search" className="searchBarInput"/>
          </form>
        </div>

        <div className="header_icons">
          <Link to="/">
            <HomeIcon fontSize="large" className="header_icon"/>
          </Link>
          <Link to="/mypage" style={{marginLeft:15}}>
            <img src={mypageIcon} alt="" fontSize="large"  className="header_icon" style={{width:"35.17px", height:"30.76" }}/>
          </Link>
          <Link to="/market" style={{marginLeft:15}}>
            <img src={markgetIcon} alt="" fontSize="large" className="header_icon" style={{width:"35.17px", height:"30.76" }}/>
          </Link>
          
        </div>
        {/* 로그아웃 분기 여기서  */}
        <div className="signupButton" >
          {par_user ? (
            <Button onClick="" 
            variant="contained" color="secondary" className="signOutButton">Logout</Button>
          ) : (
            <div className="app__loginContainer">
              <form method='GET' action='http://localhost:4000/api/auth/google' style={{display:"inline"}}>
                <input id="google_login_btn" className="google_login_btn" type="submit" value=" "/>
              </form>
              {/* <Button onClick={() => par_setOpenSignIn(true)} className="signInButton">Sign In</Button> */}
              {/* <Button onClick={() => par_setOpen(true)} variant="contained" color="secondary">Sign Up</Button> */}
            </div>
          )}
        </div>
      </div>
    );

}

export default Header;