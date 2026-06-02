const express = require("express")
const Comment = require("../models/Comment")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()


router.post("/",authMiddleware,async(req,res)=>{

try{

const comment = new Comment(req.body)

await comment.save()

res.status(201).json(comment)

}

catch(error){

res.status(500).json(error)

}

})


router.get("/:taskId",authMiddleware,async(req,res)=>{

try{

const comments = await Comment.find({
taskId:req.params.taskId
})
.populate("userId")

res.json(comments)

}

catch(error){

res.status(500).json(error)

}

})

module.exports = router