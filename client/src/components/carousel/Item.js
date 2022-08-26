//앨범 카드 컴포넌트
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import nfttestimg from '../../assets/nfttestimg.png'

function Item (props) {

    const {id, level} = props;
    const className = 'item level' + level

    return(
        <div maxWidth="md" id={id} className={className}>
                <Card
                sx={{width:'300px', height: '500px', display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                    component="img"
                    image={nfttestimg}
                    alt="random"
                    sx={{height:300}}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    NFT 제목{id}
                    </Typography>
                    <Typography>
                    NFT 설명 요약본이 들어있습니다!!!!!!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">40 Bito</Button>
                    <Button size="small">Buy</Button>
                </CardActions>
                </Card>
            </div>
    );
    
}

export default Item;
