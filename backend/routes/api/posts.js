const express = require("express");
const postController = require("../../controllers/post.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/new", auth, postController.create);
router.post("/delete", auth, postController.delete);
router.post("/all", auth, postController.getAll);

module.exports = router;
