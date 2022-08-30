import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Input } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import mainlogo2 from "../assets/mainLogo2.png";
import Container from '@mui/material/Container';
import BoardNomal from "../components/mypage/BoardNomal";
import BoardNFT from "../components/mypage/BoardNFT";
import {ERC_GetToken} from '../api/ERC_GetToken';
import { ERC_SendToken } from "../api/ERC_SendToken";
import { useContext } from "react";
import {AccountContext} from '../context/accountContext';


const ariaLabel = { "aria-label": "description" };

function MyPage(props) {

  const [boardState, setBoardState] = useState(0); // 0=nomal게시판 1=nft게시판
  const [token,setToken] = useState(); // token
  const [amount,setAmount] = useState(0); // 보낼양 
  const [target,setTarget] = useState(""); // 타겟 주소
  const {web3, user} = props;
  const {account, setAccount} = useContext(AccountContext);

  useEffect(() => {
    if(account.length != 0)
    {
      ERC_GetToken(web3,account).then((result) =>{
        setToken(result/100000000000000000)
      });
    }
  },[])

  const SendToken = () => {
    if(account.length != 0){
      ERC_SendToken(web3,account,target,amount).then(()=>{
        alert("전송 완료!");
      }).ERC_GetToken(web3,account).then((result) =>{
        setToken(result/100000000000000000)
      });
    }
  };

  return (
    <div className="App">
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Card sx={{ width: 450 }}>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Avatar 
                alt="Remy Sharp" 
                src={mainlogo2}
                style={{margin:5}} />

                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Email</h3>
                    <p>{user.email}</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Name</h3>
                    <p>{user.username}</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>IC Token</h3>
                    <p>{token} Bito</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Wallet Address</h3>
                    <p>{account}</p>
                  </Typography>
                </CardContent>
              </Stack>
            </Card>

            <Card sx={{ width: 450 }}>
              <Stack sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    <h3>보낼 주소</h3>
                    <Input 
                      className="target"
                      placeholder="보낼 주소" 
                      inputProps={ariaLabel} 
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  </Typography>
                 
                    <h3>토큰 갯수</h3>
                    <Input 
                      className="amount"
                      placeholder="토큰 갯수" 
                      inputProps={ariaLabel}   
                      value={amount}
                      type="text"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                
                </CardContent>

                {/* 토큰 전송 버튼 */}
                <CardActions>
                  <Button variant="contained"  onClick={() => SendToken()} >보내기</Button>
                </CardActions>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>


      {/* <Button variant="contained" onClick={() => setBoardState(0)} sx={{width:126}} >NFT minting</Button> */}
      

      {/* 게시목록 조회 */}
      <Stack
        sx={{ pt: 4, marginTop:5 }}
        direction="row"
        spacing={0}
        justifyContent="center"
        >
        <Button variant="contained" onClick={() => setBoardState(0)} sx={{width:426}} >게시물</Button>
        <Button variant="outlined" onClick={() => setBoardState(1)} sx={{width:426}}>NFTs</Button>
      </Stack>
      {/* 게시글 목록 */}
      <Container maxWidth="md">
          <Grid container spacing={1}>
            {
              boardState == 0? (<BoardNomal/>):(<BoardNFT/>) 
            }
          </Grid>
        </Container>
      </div>
    );
}

export default MyPage;
