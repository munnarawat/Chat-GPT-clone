const express = require("express");
const cookiePaser = require("cookie-parser")

// routes import
const authRoutes = require("./router/auth.route");
const chatRoutes = require("./router/chat.route")

// express call
const app = express();

// middileware
app.use(express.json())
app.use(cookiePaser())
// routes call
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

module.exports = app;
