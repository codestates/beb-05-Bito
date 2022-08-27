let Post = require("../model/post");
const User = require("../model/user");


const createPost = async (req, res) => {
    try {
      const newPost = new Post(req.body);
      await newPost.save();
      res.status(200).json("Post saved successfully");
    } catch (err) {
      res.status(500).json(err);
    }
}

// 이미지 업로드2
const createPost2 = async (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
        // req.protocol => http or https
        // req.get('host') => (현재) localhost:4000
        console.log(req.body)
        const post = new Post({
            userId: req.body.userId,
            comment: req.body.comment,
            userName: req.body.userName,
            imgUrl: url + '/public/' + req.file.filename,
            imgName: req.body.imgName,
        });
        
        post.save().then(result => {
            res.status(200).json({
                status: 1,
                message: 'success',
                data: result
            })
        }).catch(err => {
            console.log(err);
            res.status(200).json({
                status: 0,
                message: 'fail',
                data: err
            })
        })

    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
}

const deletePost = async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post has been deleted");
        }else{
            res.status(403).json("Invalid request for delete");
        }
    }catch(err){
        res.status(500).json(err);
    }
}

const updatePost = async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body});
            res.status(200).json("Update post successfully");
        }else{
            res.status(403).json('Invalid request for update post');
        }
    }catch(err){
        res.status(500).json(err);
    }
}

const likePost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes : req.body.userId}});
            res.status(200).json("Like complete successfully");
        }else{
            await post.updateOne({$pull : {likes : req.body.userId}});
            res.status(200).json("Unlike complete successfully");
        }
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllFeedPosts = async (req, res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const followingPosts = await Promise.all(
            currentUser.followings.map((id)=>{
                return Post.find({userId : id});
            })
        )
        const totalPosts = userPosts.concat(...followingPosts);
        res.status(200).json(totalPosts);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    createPost,
    deletePost,
    updatePost,
    likePost,
    getAllFeedPosts,
    createPost2
}