const express = require("express")
const Notification = require("../models/Notification")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()


router.get("/",authMiddleware,async(req,res)=>{

try{

const notifications =
await Notification.find()

.sort({createdAt:-1})

res.json(notifications)

}

catch(error){

res.status(500).json(error)

}

})

module.exports = router