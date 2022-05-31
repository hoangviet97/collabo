const express = require("express");
const sessionController = require("../../controllers/session.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/sessions/add", [auth], sessionController.create);
router.get("/:project/sessions/:id", auth, sessionController.getOne);
router.get("/:project/sessions", auth, sessionController.getAll);
router.delete("/:project/sessions/:id", auth, sessionController.delete);
router.get("/:project/sessions/:id/participants", auth, sessionController.getParticipants);

module.exports = router;
