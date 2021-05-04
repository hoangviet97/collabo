const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.delete("/delete", auth, taskController.delete);

module.exports = router;
