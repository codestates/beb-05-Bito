const passport = require("passport");
const User = require("../model/user");
const bcrypt = require("bcrypt");

// login Success
const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }else{
    res.status(200).json({
      success: false,
      message: "fail",
      user: null
    });
  }
};

// login Failed

const loginFailed = (req, res) => {
  
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

// logout 
// 세션에 바로 적용이안되서 로그아웃시도시 바로 적용안되는경우가 있다고함 
// 세션 save후 리다이렉트로 바꿈
const logout = (req, res) => {
  console.log("로그아웃 시작됨")
  req.logout();
  console.log("로그아웃 시작됨")
  req.session.save(function(){
    res.redirect("http://localhost:3000");
  })
};

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPW,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const signupWithGoogle = async (profile) => {
  const user = await User.findOne({ email: profile._json.email });

  if (!user) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPW = await bcrypt.hash(profile.displayName, salt);

      const newUser = new User({
        username: profile.displayName,
        email: profile._json.email,
        password: hashedPW,
      });

      const exUser = await newUser.save();
      console.log(exUser);
      return exUser;
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("User Already exists");
    return user;
  }

};

module.exports = {
  loginSuccess,
  loginFailed,
  logout,
  signup,
  signupWithGoogle,
};
