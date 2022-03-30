const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.post("/all2", auth, taskController.getAll2);
router.get("/:id/:limit", auth, taskController.getAllLimit);
router.post("/statusgroup", auth, taskController.getStatusGroup);
router.post("/all-status", auth, taskController.getByStatus);
router.post("/personal", auth, taskController.getPersonal);
router.patch("/budget", [auth, permit("Owner")], taskController.setBudget);
router.patch("/progress", [auth], taskController.setProgress);
router.patch("/desc", [auth], taskController.setDescription);
router.patch("/update-status", [auth], taskController.updateStatus);
router.patch("/update-priority", [auth], taskController.updatePriority);
router.patch("/update-start", auth, taskController.updateStartDate);
router.patch("/update-end", auth, taskController.updateEndDate);
router.post("/assignees", auth, taskController.getAllAssignees);
router.post("/assignees-status", auth, taskController.getAssigneesByStatus);
router.post("/new-assignee", [auth, permit("Owner", "Admin")], taskController.createAssignee);
router.post("/remove-assignee", [auth, permit("Owner", "Admin")], taskController.deleteAssignee);
router.post("/delete", [auth, permit("Owner", "Admin")], taskController.delete);

module.exports = router;
