const express = require("express"); 
const router = express.Router();

const main = require("./main.route");
router.use("/", main);
module.exports = router;