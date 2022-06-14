const express = require("express");
const messageController = require("../../controllers/message.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/:project/messages/add", [auth, getMemberId], messageController.create);
router.get("/:project/messages", [auth], messageController.getAll);
router.post("/:project/messages/:messageId/polls/:pollId/options/:optionId/vote", [auth, getMemberId], messageController.addVote);
router.delete("/:project/messages/:messageId/polls/:pollId/options/:optionId/vote", [auth, getMemberId], messageController.deleteVote);
router.post("/:project/messages/:messageId/replies", [auth, getMemberId], messageController.sendReply);
router.get("/:project/messages/replies", [auth], messageController.getAllReplies);

module.exports = router;
