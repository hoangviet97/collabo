const express = require("express");
const talkingPointController = require("../../controllers/talking_point.controller");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/add", auth, talkingPointController.create);
router.post("/all", auth, talkingPointController.getAll);

module.exports = router;
