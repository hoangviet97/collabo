const express = require("express");
const channelController = require("../../controllers/channel.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/new", auth, channelController.create);
router.post("/delete", auth, channelController.delete);
router.post("/all", auth, channelController.getAll);

module.exports = router;
