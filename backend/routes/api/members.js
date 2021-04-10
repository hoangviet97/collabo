const express = require("express");
const auth = require("../../middleware/auth");
const memberController = require("../../controllers/member.controller");
const router = express.Router();

router.post("/all", auth, memberController.getAll);

module.exports = router;
