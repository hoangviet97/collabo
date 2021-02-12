const express = require("express");
const { uuid } = require("uuidv4");
const { registerValidation } = require("../../validation/auth");
const authController = require("../../controllers/auth");
const router = express.Router();

router.post("/register", authController.register);

module.exports = router;
