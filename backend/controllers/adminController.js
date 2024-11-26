import jwt from "jsonwebtoken";
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import trainerModel from "../models/trainerModel.js";



//API for admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
       res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentails" });
    }
  } catch (error) {
     console.log(error)
     res.json({success:false, message:error.message})
  }
};



//API to add Trainer

const addTrainer = async(req, res)=> {
  try {
      const {name,email,password,experience,salary,about, gender,speciality,certifications,address} = req.body;
      const imageFile = req.file;
      
      //checking all data to add trainer
      if(!name || !email|| !password || !experience || !salary || !about || !gender || !speciality ||  !certifications || !address){
        return res.json({success:false, message: "Missing Details"})
      }

      //validating email
      if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please Enter a valid Email"})
      }

      //validating strong password
      if(password.length < 8){
        return res.json({success:false, message:"Please enter a strong password"})
      }

      //hashing the trainer password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      //uplaod the image to  cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
      const imageUrl = imageUpload.secure_url

      const trainerData = {
        name,
        email,
        password:hashedPassword,
        image:imageUrl,
        experience,
        salary,
        about,
         gender,
         speciality,
         certifications,
         address:JSON.parse(address),
         date:Date.now()
     }

     const newTrainer = new trainerModel(trainerData)
     await newTrainer.save()

     res.json({success:true, message:"Trainer Added"})


  } catch (error) {
     console.log(error)
     res.json({success:false, message:error.message})
  }
}

//API to get all Trainers
const allTrainers = async(req,res)=> {
  try {
    const trainers = await trainerModel.find({}).select("-password")
    res.json({success:true, trainers})

  } catch (error) {
    console.log(error)
     res.json({success:false, message:error.message})
  }
}

export  {loginAdmin, addTrainer, allTrainers}