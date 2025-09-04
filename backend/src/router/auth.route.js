const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", authController.registerController);

router.post("/login", authController.loginController);

// logOut
router.post("/logOut", authController.LogOutController);
// get user info
router.get("/user", authMiddleware.authUser, authController.GetUserInfo);

module.exports = router;
