const express = require("express");
const invitationController = require("../../controllers/invitation.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/new", auth, invitationController.create);
router.post("/all", auth, invitationController.getAll);
router.patch("/seen", auth, invitationController.updateSeenStatus);

module.exports = router;
