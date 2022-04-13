const express = require("express");
const messageController = require("../../controllers/message.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/add", [auth, getMemberId], messageController.create);
router.post("/all", [auth], messageController.getAll);
router.post("/pool-vote", [auth], messageController.getAll);
router.post("/delete-vote", [auth], messageController.getAll);

module.exports = router;
