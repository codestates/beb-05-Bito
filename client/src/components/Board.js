//게시판
import "../css/Post.css"
import Post from "../components/Post.js"

function Board({par_posts, par_user}){
  
    return (
      par_posts.map(({ id, post }) => (
        <Post
          key={id}
          postId = {id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          avatar={post.avatar}
          user = {par_user}
        />
      ))
    );

}

export default Board; 