const express = require("express");
const noteController = require("../../controllers/note.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, noteController.create);
router.patch("/update", [auth], noteController.update);
router.post("/single", [auth], noteController.getNote);

module.exports = router;
