const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, taskController.create);

module.exports = router;
