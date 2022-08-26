const express = require("express"); 
const router = express.Router();

// const main = require("./main.route");
const board = require("./board.route");
const authRoutes = require('./auth');

// router.use("/", main);
// router.use("/",board);
router.use("/auth", authRoutes);

module.exports = router;