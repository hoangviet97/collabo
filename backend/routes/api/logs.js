const express = require("express");
const logController = require("../../controllers/log.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");

const router = express.Router();

router.get("/:project/logs", [auth, getMemberId], logController.getAll);

module.exports = router;
