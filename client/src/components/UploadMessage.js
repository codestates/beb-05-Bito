// 로그인 안했을때 게시판 작성import 
import "../css/ImageUpload.css"
import Button from "@material-ui/core/Button";

function UploadMessage({par_setOpenSignIn}){
  
    return (
        <div className="upload_message" style={{maxWidth:780}}>
        <h3>로그인 후 POST를 작성 하세요 🚀 !!!</h3>
        <p><b>반갑습니다 Bito IC 커뮤니티에 오신걸 환영합니다!!</b> Bito는 여러분께 어려운 정보를 받기 원치 않습니다, Google Login을 통해 간단하게 로그인하고 커뮤니티에 참여하세요!! 
        그리고 커뮤니티에서 사용할 닉네임을 입력하세요! 그럼 가입완료!! 환영합니다 🚀🚀<br /><br />
        <b>POST를 만드는법은 간단합니다!!</b> 먼저 로그인을 하신후에 "UPLOAD PHOTO" 버튼을 클릭하여 사진을 올리세요! 
        올리지 않은경우 기본적인 이미지가 사용됩니다!! 그리고 POST하고 싶은 내용을 입력합니다 "CREATE POST" 클릭!!
        자신이 올린 POST를 친구들과 공유하세요 댓글을 달고 IC 토큰을 받으세요!! 
        <br /><br />
        <b>IC 토큰을 모아서 서로 교환하고 NFT를 구매해보세요💖 !!!</b>
        </p>
        <Button onClick={()=>par_setOpenSignIn(true)} className="upload_signInButton" color="secondary" variant="contained" >Sign In</Button>

      </div>
    );

}

export default UploadMessage; 