const express = require("express")
const Task = require("../models/Task")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()


router.post("/",authMiddleware,async(req,res)=>{

try{

const task = new Task(req.body)

await task.save()

res.status(201).json(task)

}

catch(error){

res.status(500).json(error)

}

})


router.get("/",authMiddleware,async(req,res)=>{

try{

const tasks = await Task.find()
.populate("assignedTo")
.populate("projectId")

res.json(tasks)

}

catch(error){

res.status(500).json(error)

}

})


router.put("/:id",authMiddleware,async(req,res)=>{

try{

const updatedTask = await Task.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{new:true}

)

res.json(updatedTask)

}

catch(error){

res.status(500).json(error)

}

})

module.exports = router