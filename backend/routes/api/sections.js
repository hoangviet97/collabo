const express = require("express");
const sectionController = require("../../controllers/section.controller");
const auth = require("../../middleware/auth");
const check = require("../../middleware/checkMembership");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/sections/add", [auth, permit("Owner", "Admin")], sectionController.create);
router.get("/:project/sections", [auth], sectionController.getAll);
router.delete("/:project/sections/:id", [auth, permit("Owner", "Admin")], sectionController.delete);

module.exports = router;
