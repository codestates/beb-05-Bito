const router = require("express").Router();
const Post = require("../model/post");
const {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getAllFeedPosts,
} = require("../controllers/post");

// create post
router.post("/", createPost);

// delete post
router.delete("/:id", deletePost);

// update post
router.put("/:id", updatePost);

// like/unlike post
router.put("/like/:id", likePost);

// get single post
router.get('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

// get feed posts
router.get("/feed/all/:id", getAllFeedPosts);

module.exports = router;
