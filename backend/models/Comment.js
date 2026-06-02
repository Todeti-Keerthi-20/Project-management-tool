const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },

    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model(
    "Comment",
    commentSchema
)