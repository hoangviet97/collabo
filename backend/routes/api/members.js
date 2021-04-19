const express = require("express");
const memberController = require("../../controllers/member.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/all", auth, memberController.getAll);

module.exports = router;
