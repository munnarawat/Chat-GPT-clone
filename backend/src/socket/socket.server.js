const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const AiResponse = require("../service/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../service/vector.service");
const { text } = require("express");

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
  // connection socket.io
  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      try {
        // Generate vector for the message content
        const vectors = await AiResponse.generateVector(messagePayload.content);

        // Note: We're not creating memory for user messages here since they're saved via POST endpoint
        // Memory will be created when the AI response is generated

        const [memory, chatHistory] = await Promise.all([
          queryMemory({
            queryVector: vectors,
            limit: 3,
            metadata: {
              user: socket.user._id,
            },
          }),
          messageModel
            .find({
              chat: messagePayload.chat,
            })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
            .then((userMessage) => userMessage.reverse()),
        ]);

        const stm = chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        });

        const ltm = [
          {
            role: "user",
            parts: [
              {
                text: `
               these are some previous messages:
               ${memory.map((item) => item.metadata.text).join("\n")}
              `,
              },
            ],
          },
        ];

        const response = await AiResponse.generateResponse([...ltm, ...stm]);

        // fire
        socket.emit("ai-response", {
          content: response,
          chat: messagePayload.chat,
        });

        const [responseMessage, responseVector] = await Promise.all([
          messageModel.create({
            chat: messagePayload.chat,
            user: socket.user._id,
            role:"assistant",
            content: response,
          }),
          AiResponse.generateVector(response),
        ]);

        await createMemory({
          vectors: responseVector,
          messageId: responseMessage.id,
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id,
            text: response,
          },
        });
      } catch (error) {
        console.error("❌ Error handling AI message:", error);
        socket.emit("error", {
          message: "Something went wrong, please try again.",
        });
      }
    });
  });
}
module.exports = initSocketServer;
