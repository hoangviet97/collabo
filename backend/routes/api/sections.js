const express = require("express");
const sectionController = require("../../controllers/section.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, sectionController.create);
router.post("/all", auth, sectionController.getAll);
router.post("/delete", auth, sectionController.delete);

module.exports = router;
