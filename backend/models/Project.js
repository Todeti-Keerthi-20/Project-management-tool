const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({

    projectName:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model(
    "Project",
    projectSchema
)