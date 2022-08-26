
// assets
import SearchIcon from "@material-ui/icons/Search";
import mainLogo from "../assets/mainLogo.png";
import mypageIcon from "../assets/mypageIcon.png"
import markgetIcon from "../assets/marketIcon.png"
import HomeIcon from '@material-ui/icons/Home';
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import * as global from '../Global';
import {LocalSignUp} from "../api/LocalSignUp";
import "../css/Google.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useContext } from "react";
import {AccountContext} from '../context/accountContext';
import {SetUserAddress} from "../api/SetUserAddress";


function Header(props){
    const {par_user, par_setOpenSignIn, par_setOpen, web3} = props;
    const {account, setAccount} = useContext(AccountContext);

    console.log(par_user);
    // 지갑 연결 
    const WalletConnection = () =>{
      const accounts = window.ethereum.request({
        method: "eth_requestAccounts"
      }).then(result =>{
        setAccount(result);
      })
      // 계정 업데이트(서비스이용 최종)
      const result  = SetUserAddress();
      console.log(result);
    }

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
        {/*wallet connection*/}
      
        {/* 로그아웃 분기 여기서  */}
        <div className="signupButton" >
          {par_user != null ? (
            <div>
                <div className="app__loginContainer">
              <Button onClick={() => par_setOpenSignIn(true)} className="signInButton">Sign In</Button>
              <Button onClick={() => par_setOpen(true)} variant="contained" color="secondary">Sign Up</Button>
            </div>
              {/* <Button startIcon={<AccountBalanceWalletIcon/>} onClick={() => WalletConnection()} variant="contained" color="secondary" style={{backgroundColor:"#4bf542"}}>{account.length == 0 ? "Connect" : "Wallet"}</Button> 
              <Button onClick={() => window.open(global.BASE_URL+"api/auth/logout", "_self")} 
            variant="contained" color="secondary" className="signOutButton">Logout</Button> */}
            </div>
          ) : (
            <div className="app__loginContainer">
              <Button onClick={() => par_setOpenSignIn(true)} className="signInButton">Sign In</Button>
              <Button onClick={() => par_setOpen(true)} variant="contained" color="secondary">Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    );

}

export default Header;