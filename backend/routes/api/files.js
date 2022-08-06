const express = require("express");
const fileController = require("../../controllers/file.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();
const multer = require("multer");

const upload = multer();

router.post("/:project/files/upload", [auth, upload.single("file")], fileController.upload);
router.post("/:project/tasks/:id/files/attachment/upload", [auth, upload.single("file")], fileController.uploadAttachment);
router.get("/:project/files", auth, fileController.getAll);
router.get("/:project/files/types", auth, fileController.getFileTypes);
router.get("/:project/folders/:id/files", auth, fileController.getAllByFolder);
router.get("/:project/tasks/:id/files", auth, fileController.getAllByTask);
router.get("/:project/files/:id/download", auth, fileController.download);
router.post("/:project/files/:id/move-folder", auth, fileController.moveToFolder);
router.delete("/:project/files/:id", auth, fileController.delete);
router.delete("/:project/tasks/:task/files/:id/eject", auth, fileController.ejectFile);

module.exports = router;
