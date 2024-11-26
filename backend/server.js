import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import adminRouter from "./routes/adminRoute.js"
import connectCloudinary from "./config/cloudinary.js"




// app config
const app = express()
const port = process.env.PORT || 4001
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())

//api endpoint 
app.use("/api/admin",adminRouter)



app.get("/", (req, res)=>{
   res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Started",port))