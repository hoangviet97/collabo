const express = require("express");
const memberController = require("../../controllers/member.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/all", auth, memberController.getAll);
router.patch("/role", [auth, permit("Owner", "Admin")], memberController.updateRole);
router.delete("/delete", [auth, permit("Owner", "Admin")], memberController.deleteMember);
router.delete("/leave", [auth], memberController.leave);

module.exports = router;
