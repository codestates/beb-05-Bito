const router = require("express").Router();
const Post = require("../model/post");
const multer = require('multer'); // 저장 모듈 //병일
const DIR = '/public/'; //이미지 저장 경로 //병일
const uuidv4 = require('uuid/v4') // 이미지 저장 경로 이름 사용 고유값 //병일 

const {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getAllFeedPosts,
  createPost2
} = require("../controllers/post");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,process.cwd()+DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-'); // 저장할 파일 이름 
        cb(null, uuidv4() + '-' + fileName) //file 을 받아와서 DIR 경로에 저장
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {// 말 그대로 fileFilter
        if(file.mimetype == "image/png" 
           || file.mimetype == "image/jpg" 
           || file.mimetype == "image/jpeg"){
            cb(null, true);
            console.log("save?")
        } else {
            cb(null, false);
            return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
        }
    }
});
// create post
router.post("/", createPost);

// create post2 // 병일 
router.post("/2",upload.single('file'), createPost2);

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
router.post("/feed/all", getAllFeedPosts);







module.exports = router;
