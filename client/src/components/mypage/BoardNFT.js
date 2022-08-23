import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import nfttestimg from "../../assets/nfttestimg.png"

function BoardNFT(){
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return(
        cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{height:300}}
                    image={nfttestimg}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h1">
                    NFT 설명
                    </Typography>
                    <Typography>
                    NFT 설명 요약본이 들어있습니다!!!!!!
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        ))
    );

}
export default BoardNFT;


