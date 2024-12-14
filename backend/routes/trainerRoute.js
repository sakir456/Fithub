import express from "express"
import { cancelClass, completeClass, loginTrainer, trainerClasses, trainerDashboard, trainerProfile, updateTrainerProfile } from "../controllers/trainerController.js"
import authTrainer from "../middlewares/authTrainer.js"

const trainerRouter = express.Router()

trainerRouter.post("/login", loginTrainer)
trainerRouter.get("/profile", authTrainer, trainerProfile)
trainerRouter.post("/update-profile", authTrainer, updateTrainerProfile)
trainerRouter.get("/classes", authTrainer, trainerClasses)
trainerRouter.post("/cancel-class", authTrainer,cancelClass)
trainerRouter.post("/complete-class", authTrainer,completeClass)
trainerRouter.get("/dashboard", authTrainer,trainerDashboard)

export default trainerRouter