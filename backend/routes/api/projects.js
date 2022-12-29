const express = require("express");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const check = require("../../middleware/checkMembership");
const router = express.Router();

router.post("/projects/add", [auth], projectController.create);
router.get("/projects", auth, projectController.getAll);
router.get("/:project", [auth, check], projectController.getOne);
router.patch("/:project/favorite", auth, projectController.setFavorite);
router.patch("/:project/currency", [auth, permit("Owner", "Admin")], projectController.setCurrency);
router.patch("/:project/color", [auth, permit("Owner", "Admin")], projectController.updateColor);
router.patch("/:project/status", [auth, permit("Owner", "Admin")], projectController.updateStatus);
router.delete("/:project", [auth, permit("Owner")], projectController.deleteProject);

module.exports = router;
