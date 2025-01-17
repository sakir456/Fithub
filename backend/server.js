import express from "express"
import cors from "cors"
import "dotenv/config"
import { WebSocketServer } from 'ws';
import connectDB from "./config/mongodb.js"
import adminRouter from "./routes/adminRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import trainerRouter from "./routes/trainerRoute.js"
import userRouter from "./routes/userRoute.js"
import { generateWorkOutPlan } from "./controllers/userController.js";




// app config
const app = express()
const port = process.env.PORT || 4001
const wss = new WebSocketServer({ noServer: true });
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())



//api endpoint 
app.use("/api/admin",adminRouter)
app.use("/api/trainer",trainerRouter)
app.use("/api/user",userRouter)



app.get("/", (req, res)=>{
   res.send("API WORKING")
})

// WebSocket connection setup
wss.on('connection', (ws) => {
   console.log('New client connected');

   ws.on('message', (message) => {
       const data = JSON.parse(message); // Parse the incoming data
       generateWorkOutPlan(ws, data); // Call OpenAI API to generate workout plan
   });

   ws.on('close', () => {
       console.log('Client disconnected');
   });

   ws.on('error', (error) => {
       console.error('WebSocket error:', error);
   });
});



app.server = app.listen(port, () => {
   console.log("Server Started",port);
});

app.server.on('upgrade', (request, socket, head) => {
   wss.handleUpgrade(request, socket, head, (ws) => {
       wss.emit('connection', ws, request);
   });
});

// app.listen(port,()=> console.log("Server Started",port))