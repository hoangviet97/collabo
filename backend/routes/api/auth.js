const express = require("express");
const { uuid } = require("uuidv4");
const { registerValidation } = require("../../validation/auth");
const authController = require("../../controllers/user.controller");
const router = express.Router();

router.post("/register", authController.createUser);

module.exports = router;
