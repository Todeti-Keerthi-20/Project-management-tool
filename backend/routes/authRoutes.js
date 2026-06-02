const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const router = express.Router()


router.post("/register", async(req,res)=>{

try{

const {name,email,password}=req.body

const hashedPassword=
await bcrypt.hash(password,10)

const user = new User({

name,
email,
password:hashedPassword

})

await user.save()

res.json({
message:"User Registered Successfully"
})

}

catch(error){

res.status(500).json(error)

}

})



router.post("/login", async(req,res)=>{

try{

const {email,password}=req.body

const user=
await User.findOne({email})

if(!user){

return res.json({
message:"User not found"
})
}

const valid=
await bcrypt.compare(
password,
user.password
)

if(!valid){

return res.json({
message:"Invalid Password"
})
}

const token=
jwt.sign(

{id:user._id},
process.env.JWT_SECRET

)

res.json({

token

})

}

catch(error){

res.status(500).json(error)

}

})


module.exports=router