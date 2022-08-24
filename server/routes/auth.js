const router = require("express").Router();
const passport = require("passport");

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

router.post("/local", localLogin);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;