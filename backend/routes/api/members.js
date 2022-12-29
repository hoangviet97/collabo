const express = require("express");
const memberController = require("../../controllers/member.controller");
const auth = require("../../middleware/auth");
const permit = require("../../middleware/permission");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.get("/:project/members", auth, memberController.getAll);
router.get("/members/2", auth, memberController.getAll2);
router.patch("/:project/members/:id/role", [auth, permit("Owner", "Admin"), getMemberId], memberController.updateRole);
router.delete("/:project/members/:id", [auth, permit("Owner", "Admin"), getMemberId], memberController.deleteMember);
router.delete("/:project/members", [auth, getMemberId], memberController.leaveProject);

module.exports = router;
