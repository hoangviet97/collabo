const express = require("express");
const fileController = require("../../controllers/file.controller");
const auth = require("../../middleware/auth");
const router = express.Router();
const multer = require("multer");

const upload = multer();

router.post("/:project/files/upload", [auth, upload.single("file")], fileController.upload);
router.get("/:project/files", auth, fileController.getAll);
router.get("/:project/files/types", auth, fileController.getFileTypes);
router.post("/from-folder", auth, fileController.getAllByFolder);
router.get("/:project/files/:id/download", auth, fileController.download);
router.post("/:project/files/:id/move-folder", auth, fileController.moveToFolder);
router.delete("/:id", auth, fileController.delete);

module.exports = router;
