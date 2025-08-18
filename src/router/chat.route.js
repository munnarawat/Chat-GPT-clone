const express = require("express")
// import auth middleware
const authMiddleware = require("../middleware/auth.middleware")
const chatController = require("../controllers/chat.controller")


const router = express.Router();

// post chat
router.post("/", authMiddleware.authUser, chatController.creatChat)

module.exports = router