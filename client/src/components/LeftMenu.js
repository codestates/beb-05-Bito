import mainLogo from "../assets/mainLogo.png"
import "../css/InstaEmbed.css"

function LeftMenu(){
  return(
  <div className="instaEmbed">
  <img src={mainLogo} class="embed_image"/>
    <div class="embedText">
      <h4>Hello Peeps 👋 !!!</h4>
      <h4>안녕하세요 친구들⚡ !!!</h4>
      <p>Bito IC 커뮤니티에 오신것을 환영 합니다. 우리는 블록체인에 관심있는 사람들과 
        블록체인을 사랑하는 사람들이 모여 만든 커뮤니티 입니다 여러분의 다양한 활동들은 커뮤니티를 키우는 큰 힘이 됩니다 
        글을 쓰고 보상을 받으세요!!</p><br/><br/>
        <b>P.S.</b> 
        This project has been developed for learning purposes, and it has nothing to do with the original Application.<br/><br/>
        <b>Features : </b>
        <ul>
          <li>로그인, 회원가입</li>
          <li>게시판 CRUD</li>
          <li>블록체인 컨트랙트</li>
          <li>auth2.0 google 로그인</li>
        </ul><br/>
      <h4>Hope you have a great time, exploring the application in and out ✌ !!!</h4>
    </div>
  </div> 
  
  );
}
export default LeftMenu

         