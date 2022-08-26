const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { signupWithGoogle } = require("../controllers/auth");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      signupWithGoogle(profile)
        .then((exUser) => {
          console.log("exUserFromPassport", exUser);
          const newProfile = {
            username: exUser.username,
            email: exUser.email,
            profilePicture: exUser.profilePicture,
            id:exUser._id,
          };
          console.log("profile", newProfile);
          done(null, newProfile);
        })
        .catch((error) => {
          done(error, null);
        });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log(username, password);
      try {
        const exUser = await User.findOne({ email: username });
        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            // 로그인 성공한 로직
            const newProfile = {
              username: exUser.username,
              email: exUser.email,
              profilePicture: exUser.profilePicture,
              id:exUser._id,
            };
            console.log(newProfile);
            done(null, newProfile);
          } else {
            done(null, false, { message: "Invalid Password" });
          }
        } else {
          done(null, false, { message: "User Not Found" });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
