const express = require("express");
const pollController = require("../../controllers/poll.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, pollController.create);

module.exports = router;
