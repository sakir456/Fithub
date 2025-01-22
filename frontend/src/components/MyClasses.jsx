import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"


const MyClasses = () => {
     const {backendUrl, token,  extractDateandDay, } = useContext(AppContext)

     const [classes, setClasses] = useState([])
    
    const getUserClasses = async()=> {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/userclasses", {headers: { token },})
            if(data.success){
              setClasses(data.userClasses)
              console.log(data.userClasses)
              
            }  else{
              toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelUserClass = async(classId)=> {
      try {
          const {data} = await axios.post(backendUrl + "/api/user/canceluserenrollment", {classId}, {headers: {token}} )
          if(data.success){
            toast.success(data.message)
            getUserClasses()
          } else{
            toast.error(data.message)
            
          }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
        
    }

    useEffect(()=> {
      if(token){
        getUserClasses()
      }
    },[token])


  return classes && (
    <div className="">
        <div className="   w-full h-28 bg-[url('/src/assets/hero/hero2.png')] flex justify-center items-center ">
        </div>
        
        <div className=" m-5 ">
        <p className="mb-3 text-lg font-medium">My Classes</p>
        <div className="bg-white border  rounded text-sm ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_1fr_1fr_2fr_2fr_1fr_1fr] gap-1    py-3 px-6 border-b">
        <p>#</p>
        <p> Trainer Name</p>
        <p>ClassName</p>
        <p>Date</p>
        <p>Timing</p>
        <p>Duration</p>
        <p>Action</p>
      </div>
      {
        classes.map((item, index)=> (
          <div className=" flex flex-wrap justify-between max-sm:text-base max-sm:gap-5 sm:grid grid-cols-[0.5fr_1fr_1fr_2fr_2fr_1fr_1fr] gap-1 items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50" key={index}>
        <p className="max-sm:hidden ">{index + 1}</p>
        <p>{item.trainerName}</p>
        <p>{item.className}</p>
        <p>{extractDateandDay(item.date)}</p>
        <p>{item.timing}</p>
        <p>1 Hour</p>
        
        <p>
          <button className=" px-4 max-sm:px-2 py-1 bg-red-500 hover:bg-red-600  text-white" onClick={()=> cancelUserClass(item._id)}>Cancel</button>
        </p>
        
      </div>

        ))
      }

        </div>

        </div>
        
    </div>
  )
}

export default MyClasses
