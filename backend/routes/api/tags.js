const express = require("express");
const tagController = require("../../controllers/tag.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/tags/add", [auth, permit("Owner", "Admin")], tagController.create);
router.get("/:project/tags", auth, tagController.getAll);
router.post("/:project/tags/task-tag", [auth, permit("Owner", "Admin")], tagController.createTaskTag);
router.get("/:project/tags/tasks", auth, tagController.getTagsByTasks);
router.delete("/:project/tags/:id", [auth, permit("Owner", "Admin")], tagController.deleteTag);

module.exports = router;
