const express = require("express");
const authController = require("../../controllers/user.controller");
const router = express.Router();

router.post("/register", authController.create);
router.post("/login", authController.login);

module.exports = router;
