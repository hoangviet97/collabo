const express = require("express");
const fileController = require("../../controllers/file.controller");
const auth = require("../../middleware/auth");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(new Error("only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."));
    }
    cb(undefined, true); // continue with upload
  }
});

router.post("/upload", [auth, upload.single("file")], fileController.upload);
router.post("/all", auth, fileController.getAll);
router.post("/from-folder", auth, fileController.getAllByFolder);
router.post("/download/:id", auth, fileController.download);
router.post("/move-folder", auth, fileController.moveToFolder);
router.delete("/delete", auth, fileController.delete);

module.exports = router;
