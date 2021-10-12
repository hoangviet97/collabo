const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.post("/personal", auth, taskController.getPersonal);
router.patch("/update-status", [auth], taskController.updateStatus);
router.patch("/update-priority", [auth], taskController.updatePriority);
router.patch("/update-start", auth, taskController.updateStartDate);
router.patch("/update-end", auth, taskController.updateEndDate);
router.post("/assignees", auth, taskController.getAllAssignees);
router.post("/new-assignee", auth, taskController.createAssignee);
router.post("/remove-assignee", auth, taskController.deleteAssignee);
router.post("/delete", auth, taskController.delete);

module.exports = router;
