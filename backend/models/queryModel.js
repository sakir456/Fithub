import mongoose from "mongoose"

const querySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isCompleted: {
        type: Boolean,
        default: false 
    },
    date : {
        type: Date,
         required:true,
    },
})

const queryModel = mongoose.models.contact || mongoose.model("query", querySchema)

export default queryModel