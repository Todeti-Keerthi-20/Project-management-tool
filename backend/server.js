const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
require("dotenv").config()

// Route imports
const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const commentRoutes = require("./routes/commentRoutes")
const notificationRoutes =require("./routes/notificationRoutes")

const app = express()

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})


// Middleware
app.use(express.json())
app.use(cors())


// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/notifications",notificationRoutes)


// MongoDB connection
mongoose.connect(process.env.MONGO_URL)

.then(()=>{

    console.log("Database Connected")

})

.catch((err)=>{

    console.log("Database Error:",err)

})


// Socket connection
io.on("connection",(socket)=>{

    console.log("User Connected:",socket.id)


    socket.on("newTask",(task)=>{

        io.emit("taskAdded",task)

    })


    socket.on("newComment",(comment)=>{

        io.emit("commentAdded",comment)

    })


    socket.on("disconnect",()=>{

        console.log("User Disconnected")

    })

})


// Home route
app.get("/",(req,res)=>{

res.send("Project Management Tool API Running")

})


// Start server
const PORT = process.env.PORT || 5001

server.listen(PORT,()=>{

console.log(`Server Running on Port ${PORT}`)

})