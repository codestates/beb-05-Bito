const router = require("express").Router();
const passport = require("passport");
const querystring = require('node:querystring');

const {
  loginSuccess,
  loginFailed,
  logout,
  signup,
  localLogin,
} = require("../controllers/auth");

router.get("/login/success", loginSuccess);

router.get("/login/failed", loginFailed);

router.get("/logout", logout);

router.post("/signup", signup);

// router.post("/local", localLogin )

router.post("/local", passport.authenticate('local', {
  successRedirect: "/api/auth/login/success",
  // successRedirect: "/",
  failureRedirect : '/login/failed'
}));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  }), function(req, res) {
  const query = querystring.stringify({
      "displayName":req.user.displayName,
      "email": req.user.emails[0].value
  });
  res.redirect('http://localhost:3000?'+query);
});


module.exports = router;
