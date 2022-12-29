const express = require("express");
const folderController = require("../../controllers/folder.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/folders/add", [auth, permit("Owner", "Admin")], folderController.create);
router.get("/:project/folders/:id", auth, folderController.getOne);
router.get("/:project/folders", auth, folderController.getAll);
router.delete("/:project/folders/:id", [auth, permit("Owner", "Admin")], folderController.delete);

module.exports = router;
