import mongoose from "mongoose"

const classSchema = new mongoose.Schema({
    className : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
         required:true,
    },
    timing :{
        type: String,
        required: true,
    },
    trainerName: {
        type: String,
        required: true,
    },
    trainerId: {
        type:String,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false 
    }
})

const classModel = mongoose.models.class || mongoose.model("class", classSchema)

export default classModel