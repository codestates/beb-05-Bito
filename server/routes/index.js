const express = require("express"); 
const router = express.Router();

const main = require("./main.route");
const board = require("./board.route");

router.use("/", main);
router.use("/",board);

module.exports = router;