const express = require("express");
const invitationController = require("../../controllers/invitation.controller");
const auth = require("../../middleware/auth");
const permi = require("../../middleware/permission");
const router = express.Router();

router.post("/new", [auth, permi("Owner", "Admin")], invitationController.create);
router.get("/private", auth, invitationController.getAllPrivate);
router.post("/all", auth, invitationController.getAll);
router.patch("/seen", auth, invitationController.updateSeenStatus);

module.exports = router;
