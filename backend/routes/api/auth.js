const express = require("express");
const userController = require("../../controllers/user.controller");
const authController = require("../../controllers/auth.controller");
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/register", authController.create);
router.post("/login", authController.login);
router.get("/profile", auth, userController.getCurrentUser);
router.get("/verify/:id", authController.verify);
router.post("/reset", authController.resetPassword);
router.patch("/change-pwd", authController.changePassword);
router.patch("/firstname", auth, authController.changeFirstname);
router.patch("/lastname", auth, authController.changeLastname);

module.exports = router;
