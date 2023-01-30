const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const check = require("../../middleware/checkMembership");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/:project/tasks/add", [auth, permit("Owner", "Admin")], taskController.create);
router.get("/:project/tasks/assignees", auth, taskController.getAllAssignees);
router.get("/:project/tasks", [auth], taskController.getAll);
router.get("/:project/members/:member/tasks", [auth], taskController.getPersonal);
router.get("/:project/users/:user/tasks", [auth], taskController.getPersonalUser);
router.get("/:project/tasks/status-group", auth, taskController.getStatusGroup);
router.get("/:project/tasks/:id", auth, taskController.getOne);
router.patch("/:project/tasks/:id/budget", [auth, permit("Owner", "Admin")], taskController.setBudget);
router.patch("/:project/tasks/:id/progress", [auth], taskController.setProgress);
router.patch("/:project/tasks/:id/description", [auth], taskController.setDescription);
router.patch("/:project/tasks/:id/status", [auth, permit("Owner", "Admin")], taskController.updateStatus);
router.patch("/:project/tasks/:id/priority", [auth, permit("Owner", "Admin")], taskController.updatePriority);
router.patch("/:project/tasks/:id/start", [auth, permit("Owner", "Admin")], taskController.updateStartDate);
router.patch("/:project/tasks/:id/end", [auth, permit("Owner", "Admin")], taskController.updateEndDate);
router.get("/:project/tasks/assignees/:id", auth, taskController.getAssigneeTasks);
router.post("/:project/tasks/:id/assignees/:userId", [auth, getMemberId, permit("Owner", "Admin")], taskController.createAssignee);
router.delete("/:project/tasks/:id/assignees/:assigneeId", [auth, permit("Owner", "Admin")], taskController.deleteAssignee);
router.delete("/:project/tasks/:id", [auth, permit("Owner", "Admin")], taskController.delete);

module.exports = router;
