const router = require("express").Router();
const User = require("../model/user");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require("../controllers/user");

// update User
router.put("/:id", updateUser);

// delete User
router.delete("/:id", deleteUser);

// get a user
router.get("/:id", getUser);

// follow user
router.put("/follow/:id", followUser);

// unfollow user
router.put("/unfollow/:id", unfollowUser);

module.exports = router;
