import express from "express"
import {   cancelUserEnrollment,  enrollGymClass, getClasses, getProfile, googleLogin, listClasses, registerUser, saveQuery, signInUser, updateProfile } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"


const userRouter = express.Router()     

userRouter.get("/auth/google",googleLogin)
userRouter.post("/register", registerUser)
userRouter.post("/signin", signInUser)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile",upload.single("image"),authUser, updateProfile)
userRouter.get("/get-classes", getClasses )
userRouter.post("/savequery", authUser, saveQuery)
userRouter.post("/enrollgymclass", authUser, enrollGymClass)
userRouter.get("/userclasses", authUser, listClasses)
userRouter.post("/canceluserenrollment", authUser, cancelUserEnrollment)





export default userRouter