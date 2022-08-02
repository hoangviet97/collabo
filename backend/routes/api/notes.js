const express = require("express");
const noteController = require("../../controllers/note.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/:project/sessions/:session/notes/add", auth, noteController.create);
router.patch("/:project/sessions/:session/notes/:id", [auth], noteController.update);
router.get("/:project/sessions/:session/notes", [auth], noteController.getNote);

module.exports = router;
