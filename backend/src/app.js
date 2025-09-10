const express = require("express");
const cookiePaser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

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
app.use(express.static(path.join(__dirname,'../public')))

// routes call
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

app.get("*name", (req,res) =>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
} )

module.exports = app;
