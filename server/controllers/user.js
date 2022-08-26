const User = require('../model/user');


const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
           
          return res.status(500).json(err);
        }
      }
  
      try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json("User updated successfully");
      } catch (err) {
          return res.status(500).json(err);
      }
    }else{
      res.status(403).json("You can update only your account");
    }
  }

const deleteUser = async (req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can delete only your account");
    }
}

const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...rest } = user;
      res.status(200).json(rest._doc);
    } catch (err) {
      res.status(500).json("err");
    }
  }

const followUser = async (req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const targetUser = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!targetUser.followers.includes(req.body.userId)){
                await targetUser.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("Following completed");
            }else{
                res.status(500).json("You already follow this user");
            }
        }catch(err){
            res.status(403).json("Following Failed")
        }
    }else{
        res.status(500).json("Impossible to follow yourself");
    }
}

const unfollowUser = async (req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const targetUser = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(targetUser.followers.includes(req.body.userId)){
                await targetUser.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("Unfollowing completed");
            }else{
                res.status(500).json("You already unfollow this user");
            }
        }catch(err){
            res.status(403).json("Unfollowing Failed")
        }
    }else{
        res.status(500).json("Impossible to unfollow yourself");
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unfollowUser
}