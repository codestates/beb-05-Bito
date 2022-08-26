import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import MainLogo2 from "../assets/mainLogo2.png";

function Modal_Signup(props){

    const { par_open, par_setOpen, par_username, par_setUsername, par_email, par_setEmail, par_password, par_setPassword } = props;
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
    const signUp = (event) => {
        
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
                value={par_username}
                onChange={(e) => par_setUsername(e.target.value)}
                className="signup_input"
                />
                <Input
                type="text"
                placeholder="Email"
                value={par_email}
                onChange={(e) => par_setEmail(e.target.value)}
                className="signup_input"
                />
                <Input
                type="password"
                placeholder="Password"
                value={par_password}
                onChange={(e) => par_setPassword(e.target.value)}
                className="signup_input"
                />

                <Button type="submit" onClick={signUp} variant="contained" color="secondary">
                Sign Up
                </Button>

                <div className="signInLabel">
                <img
                    displayName="modal__headerImage"
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