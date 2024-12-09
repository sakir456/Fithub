import trainerModel from "../models/trainerModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import classModel from "../models/classModel.js";


//API for trainer login
const loginTrainer = async(req, res) => {
    try {
        const {email,password} = req.body;
        const trainer = await trainerModel.findOne({email})

        if(!trainer){
            return res.json({success:false, message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,trainer.password)

        if(isMatch){
            const token = jwt.sign({id:trainer._id}, process.env.JWT_SECRET)

            res.json({success:true, token})
        } else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//API to get trainer Profile for Trainer panel
const trainerProfile = async(req, res)=> {
    try {
      const  {trainerId} = req.body;
      const profileData = await trainerModel.findById(trainerId).select("-password")
      
      res.json({success:true, profileData})
     } catch (error) {
       console.log(error)
       res.json({success:false, message:error.message}) 
    }
}

//API to update trainer profile data for trainer panel
const updateTrainerProfile = async(req, res)=> {
    try {
        const {trainerId, address} = req.body;
        await trainerModel.findByIdAndUpdate(trainerId, {address})

        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get Trainer classes for trainer panel
const trainerClasses = async(req,res)=> {
    try {
        const {trainerId} = req.body;
       const classes =  await classModel.find({trainerId})
      res.json({success:true, classes})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to cancel Class for trainer panel
const cancelClass = async(req, res)=> {
    try {
        const {trainerId,classId} = req.body;
        const classData = await classModel.findById(classId)

        if(classData && classData.trainerId ===trainerId){
            await classModel.findByIdAndUpdate(classId, {cancelled:true})

            res.json({success:true, message:"Class Cancelled Successfully"})
        } else {
            res.json({success:false, message:"Class Cancellation failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

//API to complete class for trainer panel
const completeClass = async(req, res)=> {
    try {
        const {trainerId, classId} = req.body;
        const classData =  await classModel.findById(classId)

        if(classData && classData.trainerId===trainerId){
            await classModel.findByIdAndUpdate(classId, {isCompleted: true})
            res.json({success:true, message: "Class Completed Successfully"})
        }  else {
            res.json({success:false, message: "Mark failes"})
        } 
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
 
export {loginTrainer, trainerProfile, updateTrainerProfile, trainerClasses, cancelClass, completeClass}