import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import SectionHeader from "./SectionHeader"


const Classes = () => {

  const {classes} = useContext(AppContext)
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const [isActive, setIsActive]  = useState(null)
  const [selectedClasses, setSelectedClasses]  = useState([])
  const [isActiveClass, setIsActiveClass] = useState(0)


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
    <div className="md:px-20 px-6 pt-5  font-teko flex flex-col justify-center items-center  gap-2  text-indigo-950">
    <div className="flex flex-col justify-center items-center   md:gap-5">
     <SectionHeader title="Class Time Schedule" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap md:font-bold font-semibold  md:text-5xl sm:text-4xl text-3xl uppercase text-center  ">Select the Perfect Class For You Now</p>
    </div>
    <div className="flex flex-col gap-14 mt-5  justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-4 text-2xl font-medium   ">
        {
          Object.keys(groupedClasses).map((date,index)=> (
            <p  key={index} className={`px-7 py-3 cursor-pointer transition-all ${isActive===index ? "bg-primary text-white" : "" }`} 
            onClick={()=> {setIsActive(index); setTimeout(() => setSelectedClasses(groupedClasses[date]), 200);}}>{extractDay(date)}</p>
          ))
        }
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {
          selectedClasses.length > 0 && (
            
              selectedClasses.map((item,index)=> (
                <div key={index} className={`flex flex-col gap-2 p-10 justify-center items-center hover:bg-primary hover:text-white transition-all group ${isActiveClass===index ? "bg-primary text-white group" : "" }`} 
                onClick={()=>setIsActiveClass(index)}
                >
                  <p className={`text-lg py-1 px-5 transition-all 
                  ${isActiveClass === index ? "bg-white text-black" : "bg-black text-white group-hover:bg-white group-hover:text-black"}`}>
                  {item.timing}
                  </p>
                  <p className="text-3xl mt-2">{item.className}</p>
                  <p className="font-barlow mt-2 text-sm ">{item.trainerName}</p> 
                </div>
              ))
            
          )
        }
      </div>
    </div>

    </div>
  )
}

export default Classes



// Convert grouped classes into an array of arrays
// const result = Object.keys(groupedClasses).map(date => ({
//   date,
//   classes: groupedClasses[date],
// }));