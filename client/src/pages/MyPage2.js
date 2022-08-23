import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const ariaLabel = { "aria-label": "description" };

function MyPage2() {
  return (
    <main>
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
                <Avatar alt="Remy Sharp" src="../assets/bito.png" />

                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Email</h3>
                    <p>email address</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Name</h3>
                    <p>Name</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>IC Token</h3>
                    <p>IC Token</p>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <h3>Wallet Address</h3>
                    <p>Wallet Address</p>
                  </Typography>
                </CardContent>
              </Stack>
            </Card>

            <Card sx={{ width: 450 }}>
              <Stack sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    <h3>보낼 주소</h3>
                    <Input placeholder="보낼 주소" inputProps={ariaLabel} />
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    <h3>토큰 갯수</h3>
                    <Input placeholder="토큰 갯수" inputProps={ariaLabel} />
                  </Typography>
                </CardContent>

                {/* 토큰 전송 버튼 */}
                <CardActions>
                  <Button variant="contained">보내기</Button>
                </CardActions>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      
      

      
    </main>
  );
}

MyPage2.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyPage2;
