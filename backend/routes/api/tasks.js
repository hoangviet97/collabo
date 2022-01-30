const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.post("/personal", auth, taskController.getPersonal);
router.patch("/budget", [auth], taskController.updateStatus);
router.patch("/update-status", [auth], taskController.updateStatus);
router.patch("/update-priority", [auth], taskController.updatePriority);
router.patch("/update-start", auth, taskController.updateStartDate);
router.patch("/update-end", auth, taskController.updateEndDate);
router.post("/assignees", auth, taskController.getAllAssignees);
router.post("/new-assignee", [auth, permit("Owner", "Admin")], taskController.createAssignee);
router.post("/remove-assignee", [auth, permit("Owner", "Admin")], taskController.deleteAssignee);
router.delete("/delete", [auth, permit("Owner", "Admin")], taskController.delete);

module.exports = router;
