const express = require("express");
const cookiePaser = require("cookie-parser")
const cors = require("cors")

// routes import
const authRoutes = require("./router/auth.route");
const chatRoutes = require("./router/chat.route")

// express call
const app = express();

// middileware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookiePaser())
// routes call
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

module.exports = app;
