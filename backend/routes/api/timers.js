const express = require("express");
const timerController = require("../../controllers/timer.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", [auth, getMemberId], timerController.create);
router.post("/all", auth, timerController.getAll);
router.post("/sum", auth, timerController.getSum);
router.post("/all-project", auth, timerController.getByProject);
router.post("/all-personal", [auth, getMemberId], timerController.getAllPersonal);

module.exports = router;
