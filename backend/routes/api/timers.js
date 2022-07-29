const express = require("express");
const timerController = require("../../controllers/timer.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/times/add", [auth, getMemberId], timerController.create);
router.get("/:project/times", auth, timerController.getAll);
router.get("/:project/times/sum", auth, timerController.getSum);
router.get("/:project/times/personal", [auth, getMemberId], timerController.getAllPersonal);
router.get("/:project/times/:id", [auth], timerController.getById);

module.exports = router;
