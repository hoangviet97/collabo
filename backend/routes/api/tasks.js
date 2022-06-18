const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const check = require("../../middleware/checkMembership");
const router = express.Router();

router.post("/:project/tasks/add", auth, taskController.create);
router.get("/:project/tasks", [auth], taskController.getAll);
router.get("/:project/tasks/status-group", auth, taskController.getStatusGroup);
router.patch("/:project/tasks/:id/budget", [auth, permit("Owner")], taskController.setBudget);
router.patch("/:project/tasks/:id/progress", [auth], taskController.setProgress);
router.patch("/:project/tasks/:id/description", [auth], taskController.setDescription);
router.patch("/:project/tasks/:id/status", [auth], taskController.updateStatus);
router.patch("/:project/tasks/:id/priority", [auth], taskController.updatePriority);
router.patch("/:project/tasks/:id/start", auth, taskController.updateStartDate);
router.patch("/:project/tasks/:id/end", auth, taskController.updateEndDate);
router.get("/:project/tasks/assignees", auth, taskController.getAllAssignees);
router.post("/:project/tasks/:id/assignees/:userId", [auth, permit("Owner", "Admin")], taskController.createAssignee);
router.delete("/:project/tasks/:id/assignees/:assigneeId", [auth], taskController.deleteAssignee);
router.post("/:project/tasks/:id/delete", [auth], taskController.delete);

module.exports = router;
