const express = require("express");
const invitationController = require("../../controllers/invitation.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/invitations/new", [auth], invitationController.create);
router.get("/invitations/private", auth, invitationController.getAllPrivate);
router.post("/:project/invitations/:id/accept", auth, invitationController.accept);
router.get("/:project/invitations", auth, invitationController.getAll);
router.patch("/:project/invitations/:id/seen", auth, invitationController.updateSeenStatus);
router.delete("/:project/invitations/:id", auth, invitationController.delete);

module.exports = router;
