import express from "express"
import { addClass, addTrainer, allClasses, allTrainers, allUsers, getQueries, loginAdmin, readQuery, unReadQuery, } from "../controllers/adminController.js"
import authAdmin from "../middlewares/authAdmin.js"
import upload from "../middlewares/multer.js"


const adminRouter = express.Router()


adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-trainer", authAdmin, upload.single("image"),addTrainer )
adminRouter.post("/all-users",authAdmin, allUsers)
adminRouter.post("/all-trainers",authAdmin,allTrainers)
adminRouter.post("/add-class", authAdmin, addClass)
adminRouter.get("/get-queries", authAdmin, getQueries)
adminRouter.post("/read-query", authAdmin, readQuery)
adminRouter.post("/unread-query", authAdmin, unReadQuery)
adminRouter.post("/all-classes", authAdmin, allClasses)




export default adminRouter