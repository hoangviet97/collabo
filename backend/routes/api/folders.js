const express = require("express");
const folderController = require("../../controllers/folder.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/:project/folders/add", auth, folderController.create);
router.get("/:project/folders/:id", auth, folderController.getOne);
router.get("/:project/folders", auth, folderController.getAll);
router.delete("/:project/folders/:id", auth, folderController.delete);

module.exports = router;
