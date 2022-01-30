const express = require("express");
const sessionController = require("../../controllers/session.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/add", [auth, permit("Owner", "Admin")], sessionController.create);
router.post("/single", auth, sessionController.getOne);
router.post("/all", auth, sessionController.getAll);
router.delete("/:id", auth, sessionController.delete);

module.exports = router;
