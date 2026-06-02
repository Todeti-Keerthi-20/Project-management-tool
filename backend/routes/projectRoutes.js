const express = require("express")
const Project = require("../models/Project")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()


router.post("/",authMiddleware,async(req,res)=>{

try{

const project = new Project(req.body)

await project.save()

res.status(201).json(project)

}

catch(error){

res.status(500).json(error)

}

})


router.get("/",authMiddleware,async(req,res)=>{

try{

const projects = await Project.find()
.populate("members")

res.json(projects)

}

catch(error){

res.status(500).json(error)

}

})

module.exports = router