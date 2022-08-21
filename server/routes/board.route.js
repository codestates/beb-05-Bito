const express = require("express");
const router = express.Router();

const createcon = require("../controllers/boardcreate.controller");
const deletecon = require("../controllers/boarddelete.controller");
const updatecon = require("../controllers/boardupdate.controller");
const selectcon = require("../controllers/boardselect.controller");

router.post("/board/create/", createcon.create_post)
router.get("/board/delete/:id", deletecon.delete_get)
router.post("/board/update/", updatecon.update_post)
router.get("/board/select/", selectcon.select_get)

module.exports = router;