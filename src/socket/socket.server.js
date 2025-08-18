const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const AiResponse = require("../service/ai.service");
const messageModel = require("../models/message.model");
function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  // socket io middleware
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies) {
      next(new Error("Authentication error: no token provider"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error:Invalid token"));
    }
  });
  // connecttion socket.io
  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      try {
        await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        });

        const chatHistory = (await messageModel.find({
          chat: messagePayload.chat,
        }).sort({createdAt:-1}).limit(4).lean()).reverse();

        const aiInput = chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        });
        const response = await AiResponse.generateResponse(aiInput);

        await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: response,
          role: "model",
        });
        // fire
        socket.emit("ai-response", {
          content: response,
          chat: messagePayload.chat,
        });
      } catch (error) {
        console.error("❌ Error handling AI message:", error.message);
        socket.emit("error", {
          message: "Something went wrong, please try again.",
        });
      }
    });
  });
}
module.exports = initSocketServer;
