const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require("passport");
const passportSetup = require("./passport");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const nftRoute = require('./routes/nft')


dotenv.config();

mongoose.connect("mongodb+srv://beb0502:beb0502@cluster0.cpkgm5l.mongodb.net/bitoDB?retryWrites=true&w=majority", () => {
    console.log("Connected to Mongo DB ...");
  });

const app = express();


app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(session({
  name:'bitoSession',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


// OAuth 2.0
app.use(passport.initialize());
app.use(passport.session());

app.use('/', (req, res, next)=>{
  console.log(req.user);
  next();
})

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/nft", nftRoute);

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);
});
