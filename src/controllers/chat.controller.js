const chatModel = require("../models/chat.model");

async function creatChat(req,res) {

    const {title}= req.body;
    const user = req.user;
     
    const chat = await chatModel.create({
        user:user._id,
        title
    });

    res.status(201).json({
        message:"Chat created succussfully ",
        chat:{
            id:chat._id,
            title:chat.title,
            lastActivity: chat.lastActivity,
            user:chat.user
        }
    })
}

module.exports = {
    creatChat
}