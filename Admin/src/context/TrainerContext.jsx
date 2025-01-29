import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const TrainerContext = createContext()

const TrainerContextProvider = (props) => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL
        
        const [loading, setLoading] = useState(false)
        const [tToken, setTToken] = useState(localStorage.getItem("tToken") ? localStorage.getItem("tToken"): "")
        const [profileData, setProfileData] = useState(false)
        const [classes, setClasses] = useState([])
        const [dashData, setDashData] = useState(false)

        const getProfileData = async()=> {
                setLoading(true)
                try {
                    const {data} =  await axios.get(backendUrl + "/api/trainer/profile", {headers:{tToken}})   
                    if(data.success){
                    setProfileData(data.profileData)
                    console.log(data.profileData)
                    } else{
                        toast.error(data.message)
                    }
                } catch (error) {
                   console.log(error)
                   toast.error(error.message)
                }finally{
                 setLoading(false)
                }
        }

        const getClasses = async()=> {
                setLoading(true)
          try {
                const {data} = await axios.get(backendUrl + "/api/trainer/classes", {headers:{tToken}})
                if(data.success){
                   setClasses(data.classes)
                   console.log(data.classes)

                } else{
                 toast.error(data.message)
                }
          } catch (error) {
                console.log(error)
                toast.error(error.message)
           }finally{
                setLoading(false)
               }
        }

        const cancelClass = async(classId)=> {
                try {
                  const {data}  = await axios.post(backendUrl + "/api/trainer/cancel-class", {classId}, {headers:{tToken}})
                  if(data.success){
                        toast.success(data.message)
                        getClasses()
                       
                  } else{
                        toast.error(data.message)
                  }
                } catch (error) {
                        console.log(error)
                        toast.error(error.message)

                  
                }
        }

        const completeClass = async(classId)=> {
                try {
                        const {data}  = await axios.post(backendUrl  + "/api/trainer/complete-class", {classId}, {headers:{tToken}})
                        if(data.success){
                                toast.success(data.message)
                                getClasses()
                                
                        } else{
                                toast.error(data.message)
                        }    
                } catch (error) {
                       console.log(error)
                       toast.error(error.message) 
                }
                
        }

        const getDashData  = async()=>{
                setLoading(true)
                
              try {
                const {data} = await axios.get(backendUrl + "/api/trainer/dashboard", {headers:{tToken}})
                if(data.success){
                   setDashData(data.dashData)
                   console.log(data.dashData)
                } else {
                  toast.error(data.message)
                }
              } catch(error){
                console.log(error)
                toast.error(error.message)
              }finally{
                setLoading(false)
               }
        }
        


        const value = {
                tToken, setTToken,
                backendUrl,
                profileData, setProfileData,
                getProfileData,
                classes, setClasses,
                getClasses, cancelClass ,completeClass,
                dashData, setDashData,
                getDashData, 
                loading, setLoading

        }

        return (
             <TrainerContext.Provider value={value}>
              {props.children}
             </TrainerContext.Provider>
        )

}

export default TrainerContextProvider