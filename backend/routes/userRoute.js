import express from "express"
import { getProfile, googleLogin, registerUser, signInUser, updateProfile } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"


const userRouter = express.Router()

userRouter.get("/auth/google",googleLogin)
userRouter.post("/register", registerUser)
userRouter.post("/signin", signInUser)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile",upload.single("image"),authUser, updateProfile)




export default userRouter