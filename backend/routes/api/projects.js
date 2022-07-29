const express = require("express");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const permi = require("../../middleware/permission");
const check = require("../../middleware/checkMembership");
const router = express.Router();

router.post("/projects/add", [auth], projectController.create);
router.get("/projects", auth, projectController.getAll);
router.get("/:project", [auth, check], projectController.getOne);
router.patch("/projects/:id/favorite", auth, projectController.setFavorite);
router.patch("/projects/:id/budget", [auth, permi("Owner", "Admin")], projectController.setBudget);
router.patch("/projects/:id/currency", [auth, permi("Owner", "Admin")], projectController.setCurrency);
router.patch("/:project/color", [auth, permi("Owner", "Admin")], projectController.updateColor);
router.patch("/projects/:id/status", [auth, permi("Owner", "Admin")], projectController.updateStatus);
router.delete("/projects/:id", [auth, permi("Owner")], projectController.deleteProject);

module.exports = router;
