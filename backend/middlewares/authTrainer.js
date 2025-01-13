import jwt from "jsonwebtoken"

// Trainer authentication middleware
const authTrainer = async(req, res, next)=> {
    try {
        const {ttoken} = req.headers;
        if(!ttoken){
            return res.json({success:false, message:"Not Authorized login again"})
        }
        const token_decode = jwt.verify(ttoken, process.env.JWT_SECRET)
        req.body.trainerId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authTrainer