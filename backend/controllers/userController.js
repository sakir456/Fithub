import axios from "axios";
import oauth2client from "../config/googleConfig.js"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";
import {v2 as cloudinary} from "cloudinary"
import classModel from "../models/classModel.js";
import queryModel from "../models/queryModel.js";


// API to googleLogin
const googleLogin = async (req, res) => {
    try {
         const {code} = req.query
         const googleRes = await oauth2client.getToken(code);

         oauth2client.setCredentials(googleRes.tokens);

         const userRes = await axios.get(
           `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )

        const {email, name} = userRes.data;
        let user  = await userModel.findOne({email});

        if(!user){
            user = await userModel.create({name, email,  authType: "google"})
        }

       
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        return res.status(200).json({message:'success', token, user})
    } catch (error) {
        console.error('Error during Google login:', error);
         res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

//API to register user via email password

const registerUser = async(req,res)=> {
    try {
        const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false, message:"Missing details"})
    }
    
    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Enter a valid Email"})
    }

    if(password.length < 8) {
        return res.json({success:false, message:"Enter a strong Password"})
    }

    //hashing a password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

     const userData = {
        name,
        email,
        password:hashedPassword,
        authType: "local"
     }

     const newUser = new userModel(userData)
     const user = await newUser.save()

     const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
     res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({ success:false, message:error.message})
    }
}

//API for user signIn
const signInUser = async(req, res)=> {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token  = jwt.sign({id:user._id}, process.env.JWT_SECRET) 
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//API to get user profile data
const getProfile = async(req, res)=> {
    try {
     const {userId} = req.body;
     const userData = await userModel.findById(userId).select("-password")

     res.json({success: true, userData})
    } catch(error) {
       console.log(error)
       res.json({success:false, message:error.message})
    }
}

//API to update user Profile
const updateProfile  = async(req, res)=> {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success:false, message: "Data Missing" });
          }
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address:JSON.parse(address),
            dob,
            gender
        });

        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{
                resource_type:"image",
            })
            const imageURL = imageUpload.secure_url;
            
            await userModel.findByIdAndUpdate(userId, {image:imageURL})
        }

        res.json({ success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//API to get classes for week for frontend
const getClasses = async(req,res) => {
    try {
        const today = new Date()
        today.setHours(0,0,0,0);

        const endDate = new Date()
        endDate.setDate(today.getDate() + 6)

        const classes = await classModel.find({
            date: {
                $gte: today,
                $lte: endDate
            }
        }).sort({ date:1 });
     res.json({success:true, classes})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to save User Query 
const saveQuery = async(req, res)=> {
    try {
         const {name, email, subject, message} = req.body;
         
         if(!name || !email || !subject ||  !message) {
            return res.json({success:false, message:"Please fill all the fields "})
         }
         const queryData = {
            name,
            email,
            subject,
            message,
            date: Date.now()
         }
       
         const newQuery = new queryModel(queryData)
         await newQuery.save()

         res.json({success:true, message:"Query Submitted Successfully"})

        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}




export { googleLogin, registerUser, signInUser, getProfile, updateProfile, getClasses, saveQuery }