const express = require("express")
// import auth middleware
const authMiddleware = require("../middleware/auth.middleware")
const chatController = require("../controllers/chat.controller")


const router = express.Router();

// post chat
router.post("/", authMiddleware.authUser, chatController.creatChat);
router.get("/", authMiddleware.authUser, chatController.getChat);
router.get("/messages/:id", authMiddleware.authUser, chatController.getMessage);
router.post("/messages/:id", authMiddleware.authUser, chatController.createMessage);

module.exports = router