const express = require("express");
const messageController = require("../../controllers/message.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/add", [auth, getMemberId], messageController.create);
router.post("/all", [auth], messageController.getAll);
router.post("/pool-vote", [auth, getMemberId], messageController.addVote);
router.post("/delete-vote", [auth, getMemberId], messageController.deleteVote);

module.exports = router;
