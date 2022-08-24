const express = require("express");
const { Timestamp } = require("mongodb");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose')
const passport = require("passport");
const passportSetup = require("./passport");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const nftRoute = require("./routes/nft");

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECT, () => {
    console.log("Connected to Mongo DB ...");
  });

const app = express();


app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "bt-auth",
    keys: ["bito"],
    maxAge: 24 * 60 * 100,
  })
);

// OAuth 2.0
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.get('/', (req, res)=>{
    res.json("Welcome to Bito Marketplace Appcliation");
})
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/nft", nftRoute);

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);
});
