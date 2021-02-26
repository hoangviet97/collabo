const express = require("express");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, projectController.create);
router.get("/", auth, projectController.getAll);

module.exports = router;
