const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true
    },
    title:{
        type:String,
        required:true
    },
    lastActivity:{
        type:Date,
        default:Date.now,
    }
},{
    timeseries:true
})

const chatModel = mongoose.model("chat",chatSchema)
module.exports =chatModel;