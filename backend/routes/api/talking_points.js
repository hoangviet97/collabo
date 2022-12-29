const express = require("express");
const talkingPointController = require("../../controllers/talking_point.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/:project/sessions/:session/talking-points/add", auth, talkingPointController.create);
router.get("/:project/sessions/:session/talking-points", auth, talkingPointController.getAll);
router.patch("/:project/sessions/:session/talking-points/:id/check", auth, talkingPointController.updateCheck);

module.exports = router;
