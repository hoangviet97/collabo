const express = require("express");
const authController = require("../../controllers/user.controller");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, projectController.create);

module.exports = router;