const express = require("express");
const sessionController = require("../../controllers/session.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, sessionController.create);
router.post("/all", auth, sessionController.getAll);

module.exports = router;
