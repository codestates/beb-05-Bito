// modal
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import MainLogo2 from "../assets/mainLogo2.png";
import { useNavigate } from "react-router-dom";
import * as global from '../Global';
import axios from "axios";

function Modal_Signin(props){
    // 부모로 부터 속성 다받아오고 
    const navigate = useNavigate();
    const {par_openSignIn, par_setOpenSignIn} = props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
        
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: "absolute",
          width: 280,
          height: 360,
          backgroundColor: theme.palette.background.paper,
          border: "1px solid #000",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }));

    // 로그인 이벤트 
    const signIn = (event) => {
      axios({
        url: global.BASE_URL+"api/auth/local",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
        withCredentials : true,
      }).then(result=>{
        if(result.status === 200){
          try {
            navigate('/');
          } catch (error) {
            console.error(error);
          }
        }else{
          navigate('/login')
        }
      })
    };
    
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    return (
        <Modal open={par_openSignIn} onClose={() => par_setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="modal__headerImage"
                  src={MainLogo2}
                  alt="bitologo2"
                />
              </center>
  
              <Input
                type="text"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup_input"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup_input"
              />
  
              <Button type="submit" onClick={signIn} variant="contained" color="secondary">
                Sign In
              </Button>
              <Button 
              onClick={() =>{ window.open(global.BASE_URL+"api/auth/google", "_self");}} 
              id="google_login_btn" 
              className="google_login_btn"/>

              {/* <form method='GET' action='http://localhost:4000/api/auth/google' style={{display:"inline"}}>
                <input id="google_login_btn" className="google_login_btn" type="submit" value=" "/>
              </form> */}
  
              <div className="signInLabel">
                <img
                  displayname="modal__headerImage"
                  src="https://i.pinimg.com/originals/8a/77/05/8a770507298d728a1e3e039a0507dd8e.png"
                  alt="instagram"
                  className = "signInLabelImg"
                />
                <p className = "signInLabelText">Sed ut perspiciatis unde omnis iste natus error sit voluptatem Sed ut perspiciatis unde omnis iste natus error ut perspiciatis unde omnis iste natus error </p>
              </div>
  
                          
            </form>
           
          </div>
        </Modal>

    );
}

export default Modal_Signin