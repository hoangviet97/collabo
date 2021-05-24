const express = require("express");
const taskController = require("../../controllers/task.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, taskController.create);
router.post("/all", auth, taskController.getAll);
router.post("/personal", auth, taskController.getPersonal);
router.patch("/update", auth, taskController.update);
router.post("/delete", auth, taskController.delete);

module.exports = router;
