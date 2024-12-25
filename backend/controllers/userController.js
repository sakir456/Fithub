import axios from "axios";
import oauth2client from "../config/googleConfig.js"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";



// API to googleLogin
const googleLogin = async (req, res) => {
    try {
         const {code} = req.query
         const googleRes = await oauth2client.getToken(code);

         oauth2client.setCredentials(googleRes.tokens);

         const userRes = await axios.get(
           `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )

        const {email, name, picture} = userRes.data;
        let user  = await userModel.findOne({email});

        if(!user){
            user = await userModel.create({name, email, image:picture, authType: "google"})
        }

        const {_id} = user;

        const token = jwt.sign({_id, email}, process.env.JWT_SECRET)

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

export { googleLogin, registerUser, signInUser }