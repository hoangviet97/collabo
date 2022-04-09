const express = require("express");
const tagController = require("../../controllers/tag.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", [auth, permit("Owner", "Admin")], tagController.create);
router.post("/all", auth, tagController.getAll);
router.post("/task-tag", auth, tagController.createTaskTag);
router.post("/tasks", auth, tagController.getTagsByTasks);
router.post("/delete", auth, tagController.deleteTag);

module.exports = router;
