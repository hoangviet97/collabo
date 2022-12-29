const express = require("express");
const userController = require("../../controllers/user.controller");
const authController = require("../../controllers/auth.controller");
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/register", authController.create);
router.post("/login", authController.login2);
router.get("/profile", auth, userController.getCurrentUser);
router.get("/verify/:id", authController.verify);
router.post("/reset", authController.resetPassword);
router.patch("/reset-pwd", authController.setNewPassword);
router.patch("/color", auth, authController.changeColor);
router.patch("/change-pwd", auth, authController.changePassword);
router.patch("/firstname", auth, authController.changeFirstname);
router.patch("/lastname", auth, authController.changeLastname);

module.exports = router;
