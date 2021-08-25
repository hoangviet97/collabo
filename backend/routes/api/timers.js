const express = require("express");
const timerController = require("../../controllers/timer.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", auth, timerController.create);
router.post("/all", auth, timerController.getAll);
router.get("/all-personal", auth, timerController.getAllPersonal);

module.exports = router;
