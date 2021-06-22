const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.post("/personal", auth, taskController.getPersonal);
router.patch("/update-status", [auth, isAdmin], taskController.updateStatus);
router.patch("/update-priority", [auth, isAdmin], taskController.updatePriority);
router.post("/delete", auth, taskController.delete);

module.exports = router;
