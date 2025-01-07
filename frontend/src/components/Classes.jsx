import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"


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
    <div className="pt-10 pb-20 font-teko flex flex-col gap-2 items-center">
    <div  className="flex  gap-2 items-center text-primary ">
              <hr className="border-none outline-none h-0.5 bg-primary w-10" />
              <p className="text-2xl sm:text-xl max-sm:text-lg font-light uppercase md:tracking-wide">
                Class Time Schedule
              </p>
            </div>
    <p className=" flex flex-wrap md:text-4xl text-2xl sm:text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Select the Perfect Class For You Now</p>
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