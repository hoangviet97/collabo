const express = require("express");
const folderController = require("../../controllers/folder.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, folderController.create);
router.post("/all", auth, folderController.getAll);

module.exports = router;
