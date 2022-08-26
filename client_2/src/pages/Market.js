import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/Carousel.css";

import Carousel from "../components/carousel/Carousel";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



export default function Market(){
    const [active, setActive] = useState(0);
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cards = [1, 2, 3];
    const theme = createTheme();

    const _setActive = (value) => {
        setActive(value)
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                    Bito NFT Market 
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    안녕하세요! BIto IC 커뮤니티에서 열심히 활동한 여러분들을 위해 마켓 전용 NFT및 
                    등록한 NFT를 구매할수있습니다 여러분의 NFT를 자랑하고 구경하세요 모든 NFT 구매에는 
                    마켓 전용 Bito 토큰이 사용됩니다 
                    </Typography>
                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                    <Button variant="contained">Market NFTs</Button>
                    <Button variant="outlined">NFTs other than the market</Button>
                    </Stack>
                </Container>
                </Box>
            </ThemeProvider>



            <Carousel par_items={items} par_active={active} par_setActive={_setActive}/>

        </div>
    );


}