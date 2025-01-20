import { useContext } from "react"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"


const GymClass = ({ classInfo, classId }) => {

    const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","SaturdayY"]
    const {backendUrl, token} = useContext(AppContext)

    const extractDateandDay = (date)=> {
        const newDate = new Date(date)
        const day = newDate.getDate()
        const month = monthsofYear[newDate.getMonth()]  
        const fullYear = newDate.getFullYear()
        const dayOfWeek =  daysOfWeek[ newDate.getDay()]
        
        return `${day} ${month} ${fullYear} - ${dayOfWeek} `
      }

      const submitHandler = async (e)=> {
        e.preventDefault()
         
        try {
            const {data} = await axios.post(backendUrl + "/api/user/enrollgymclass", {classId}, {headers:{token}})
            if(data.success){
              toast.success(data.message)
            } else{
              toast.error(data.message)
            }
        } catch (error) {
           console.log(error)
           toast.error(error.message)
        }
      }
      
  return classInfo &&  (
    <div className=" px-6 pt-10 pb-20 font-teko flex flex-col gap-2 items-center w-full text-indigo-950" >
    <SectionHeader title="Join Class" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap lg:text-5xl sm:text-4xl text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Elevate Your Fitness with Expert-Led Classes. </p>
    <form onSubmit={submitHandler}  className=" flex flex-1  flex-col w-full max-w-4xl border shadow-lg p-5 py-10  mt-5  gap-7 font-barlow">
    <div className="flex md:flex-row flex-col  md:gap-5 gap-7 w-full">
    <div className="flex flex-col gap-1.5  w-full text-sm" >
    <span className="font-medium">Date & Day:</span>
    <select  className="px-3 py-3 border m  outline-none ">
        <option value="Select Gender">{extractDateandDay(classInfo.date)}</option>
  </select>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm" >
    <span className="font-medium">Classname:</span>
    <select  className="px-3 py-3 border m  outline-none ">
        <option value="Select Gender">{classInfo.className}</option>
        
    </select>
    </div>
  </div>
  <div className="flex md:flex-row flex-col  md:gap-5 gap-7 w-full">
  <div className="flex flex-col gap-1.5  w-full text-sm" >
    <span className="font-medium">Timing:</span>
    <select  className="px-3 py-3 border m  outline-none ">
        <option value="Select Gender">{classInfo.timing}</option>
        </select>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm" >
    <span className="font-medium">Trainer Name:</span>
    <select  className="px-3 py-3 border m  outline-none ">
        <option value="Select Gender">{classInfo.trainerName}</option>
    </select>
    </div>
  </div>
  <div className="w-full flex items-start">
    <button className="py-4 px-10  text-primary border border-primary font-teko tracking-widest hover:bg-primary hover:text-white transition-all">Enroll Class</button>
   </div>
     </form>

    </div>
  )
}

export default GymClass