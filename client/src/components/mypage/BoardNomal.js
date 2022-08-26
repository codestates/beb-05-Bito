import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import mainlogo2 from "../../assets/mainLogo2.png";

function BoardNomal(){
    const cards = [1, 2, 3, 4, 5, 6, 7];

    return(
        cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{height:300}}
                    image={mainlogo2}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h1">
                    제목
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        ))
    );

}
export default BoardNomal;


