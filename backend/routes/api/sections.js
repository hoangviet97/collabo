const express = require("express");
const sectionController = require("../../controllers/section.controller");
const auth = require("../../middleware/auth");
const check = require("../../middleware/checkMembership");
const router = express.Router();

router.post("/add", auth, sectionController.create);
router.post("/all", [auth, check], sectionController.getAll);
router.post("/delete", auth, sectionController.delete);

module.exports = router;
