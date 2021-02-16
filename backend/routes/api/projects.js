const express = require("express");
const authController = require("../../controllers/user.controller");
const projectController = require("../../controllers/project.controller");
const router = express.Router();

router.post("/add", projectController.create);

module.exports = router;
