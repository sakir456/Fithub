import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import adminRouter from "./routes/adminRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import trainerRouter from "./routes/trainerRoute.js"
import userRouter from "./routes/userRoute.js"
import setupWebSocket from "./wsServer.js"





// app config
const app = express()
const port = process.env.PORT || 4001
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors({
   origin: ["http://localhost:3001/", "http://localhost:3000/" , "https://fithub-frontend-1bc1.onrender.com"],
   credentials: true, 
 }))



//api endpoint 
app.use("/api/admin",adminRouter)
app.use("/api/trainer",trainerRouter)
app.use("/api/user",userRouter)



app.get("/", (req, res)=>{
   res.send("API WORKING")
})

const server = app.listen(port, () => {
   console.log("Server Started",port);
});

setupWebSocket(server)



