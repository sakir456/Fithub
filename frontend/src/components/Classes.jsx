import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import SectionHeader from "./SectionHeader"
import {useNavigate} from "react-router-dom"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



const Classes = () => {

  const {classes,loading} = useContext(AppContext)
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const [isActive, setIsActive]  = useState(null)
  const [selectedClasses, setSelectedClasses]  = useState([])
  const [isActiveClass, setIsActiveClass] = useState(0)
  
  const navigate = useNavigate()
  

  const extractDay = (date)=> {
     const newDate = new Date(date)
     const dayOfWeek = daysOfWeek[newDate.getDay()]
     return dayOfWeek
  }

  const groupedClasses = classes.reduce((acc, item)=>{
       const classDate  = item.date.split("T")[0]
       if(!acc[classDate]){
        acc[classDate] = []
       } 
       acc[classDate].push(item)
        return acc
     },{})

     
 

  useEffect (()=> {
      const firstDate = Object.keys(groupedClasses)[0]
      if(firstDate){
        setIsActive(0)
        setSelectedClasses(groupedClasses[firstDate])
      }
  },[classes])

 
    
  return classes && (
    <div className=" mt-10   font-teko flex flex-col justify-center items-center  gap-2  text-indigo-950">
    <div className="flex flex-col justify-center items-center   sm:gap-5">
     <SectionHeader title="Class Time Schedule" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap flex-col max-sm:text-center w-full md:font-bold font-semibold  lg:text-5xl sm:text-4xl text-3xl uppercase justify-center     ">Choose a Perfect Class and 

    <br/> 
    <span className="text-center"> Click to Enroll</span>
     </p>
    </div>
    <div className="flex flex-col gap-14 mt-5  justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-4 text-2xl font-medium">
        { loading ? (
          Array(7).fill(0).map((_, index) => (
            <div key={index} className="px-7 py-3 border border-gray-200">
                <Skeleton  width={100} height={30} />
                </div>
              ))
        ) : (
          Object.keys(groupedClasses).map((date,index)=> (
            <p  key={index} className={`px-7 py-3 cursor-pointer transition-all ${isActive===index ? "bg-primary text-white" : "" }`} 
            onClick={()=> {setIsActive(index); setTimeout(() => setSelectedClasses(groupedClasses[date]), 200);}}>{extractDay(date)}</p>
          )))
        }
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {
          loading ? (
            Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-10 justify-center items-center border border-gray-200"
                  >
                    <Skeleton width={140} height={25} />
                    <Skeleton width={100} height={30} />
                    <Skeleton width={80} height={20} />
                  </div>
                 ))) :
          selectedClasses.length > 0 && (
            
              selectedClasses.map((item,index)=> (
                !item.isCompleted && !item.cancelled &&(
                <div key={index} className={`flex flex-col gap-2 p-10 justify-center items-center cursor-pointer hover:bg-primary hover:text-white transition-all group ${isActiveClass===index ? "bg-primary text-white group" : "" }`} 
                onClick={()=> {setIsActiveClass(index); navigate(`/schedule/${item._id}`)}}
                >
                  <p className={`text-lg py-1 px-5 transition-all 
                  ${isActiveClass === index ? "bg-white text-indigo-950" : "bg-indigo-950 text-white group-hover:bg-white group-hover:text-indigo-950"}`}>
                  {item.timing}
                  </p>
                  <p className="text-3xl mt-2">{item.className}</p>
                  <p className="font-barlow mt-2 text-sm ">{item.trainerName}</p> 
                </div>
                )
              ))
            
          )
        }
      </div>
    </div>

    </div>
  )
}

export default Classes



