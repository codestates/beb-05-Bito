import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import MainLogo2 from "../assets/mainLogo2.png";
import {LocalSignUp} from "../api/LocalSignUp";

function Modal_Signup(props){

    const { par_open, par_setOpen } = props;

    const [email,setEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [password,serPassword] = useState("");
    

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

    // 회원가입 이벤트 
    const signUp = () => {
        const result = LocalSignUp(userName,password,email);
        par_setOpen(false);
        alert("회원 가입 완료!");
        console.log(result);
    };

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return(
        <Modal open={par_open} onClose={() => par_setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
                <center>
                <img
                    className="modal__headerImage"
                    src={MainLogo2}
                    alt="mainlogo2"
                />
                </center>
                <Input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="signup_input"
                />
                <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup_input"
                />
                <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => serPassword(e.target.value)}
                className="signup_input"
                />

                <Button type="submit" onClick={() => signUp()} variant="contained" color="secondary">
                Sign Up
                </Button>

                <div className="signInLabel">
                <img
                    displayname="modal__headerImage"
                    src="https://i.pinimg.com/originals/8a/77/05/8a770507298d728a1e3e039a0507dd8e.png"
                    alt="instagram"
                    className="signInLabelImg"
                />
                <p className = "signInLabelText">Sed ut perspiciatis unde omnis iste natus error sit voluptatem Sed ut perspiciatis unde omnis iste natus error ut perspiciatis unde omnis iste natus error </p>
                </div>
            </form>
            </div>
        </Modal>
    );
}

export default Modal_Signup;