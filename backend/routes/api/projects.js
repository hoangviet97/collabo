const express = require("express");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const permi = require("../../middleware/permission");
const router = express.Router();

router.post("/add", auth, projectController.create);
router.get("/", auth, projectController.getAll);
router.post("/single", auth, projectController.getOne);
router.patch("/favorite", auth, projectController.setFavorite);
router.patch("/budget", [auth], projectController.setBudget);
router.patch("/currency", [auth], projectController.setCurrency);
router.patch("/color", [auth, permi("Owner", "Admin")], projectController.updateColor);
router.patch("/status", [auth, permi("Owner", "Admin")], projectController.updateStatus);
router.post("/delete", [auth, permi("Owner")], projectController.deleteProject);

module.exports = router;
