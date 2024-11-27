import express from "express"
import { addClass, addTrainer, allTrainers, loginAdmin, } from "../controllers/adminController.js"
import authAdmin from "../middlewares/authAdmin.js"
import upload from "../middlewares/multer.js"


const adminRouter = express.Router()


adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-trainer", authAdmin, upload.single("image"),addTrainer )
adminRouter.post("/all-trainers",authAdmin,allTrainers)
adminRouter.post("/add-class", authAdmin, addClass)




export default adminRouter