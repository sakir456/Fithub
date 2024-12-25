import express from "express"
import { googleLogin, registerUser, signInUser } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.get("/auth/google",googleLogin)
userRouter.post("/register", registerUser)
userRouter.post("/signin", signInUser)




export default userRouter