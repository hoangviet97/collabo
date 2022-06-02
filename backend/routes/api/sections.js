const express = require("express");
const sectionController = require("../../controllers/section.controller");
const auth = require("../../middleware/auth");
const check = require("../../middleware/checkMembership");
const router = express.Router();

router.post("/:project/sections/add", auth, sectionController.create);
router.get("/:project/sections", [auth], sectionController.getAll);
router.delete("/:project/sections/:id", auth, sectionController.delete);

module.exports = router;
