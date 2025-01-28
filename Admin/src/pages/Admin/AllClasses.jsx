import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import LoadingSpinner from "../../components/LoadingSpinner"


const AllClasses = () => {
  const {classes, aToken, getAllClasses, cancelClass, completeClass, loading} = useContext(AdminContext)
  const daysOfWeek = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
  const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

  

  const extractDateandDay = (dateISOString)=> {
    const date = new Date(dateISOString)
    const day = date.getDate()
    const month = monthsofYear[date.getMonth()]  
    const fullYear = date.getFullYear()
    const dayOfWeek =  daysOfWeek[date.getDay()]
  
    return `${day} ${month} ${fullYear} - ${dayOfWeek} `
  }
  
  
  
   
   useEffect(()=> {
    if(aToken){
      getAllClasses()
    }   
   },[aToken])
  
  return  (
    loading ? (
      <LoadingSpinner/>
    ) : classes && (
    <div className="w-full max-w-6xl m-5  ">
    <p className="mb-3 text-lg font-medium">All Classes</p>
    <div className="bg-white border  rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
      <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] gap-1  py-3 px-6 border-b">
        <p>#</p>
        <p>Class & Trainer Name</p>
        <p>Date & Day</p>
        <p>Time</p>
         <p>Users Enrolled</p>
        <p>Action</p>
      </div>
      {
        classes.reverse().map((item,index)=> (
          <div className="flex flex-wrap justify-between max-sm:text-base max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] gap-1 items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50"  key={index}>
          <p className="max-sm:hidden">{index + 1}</p>
          <p>{item.className}-{item.trainerName}</p>
          <p>{extractDateandDay(item.date)}</p>  
          <p>{item.timing}</p>
          
          <p className="max-sm:hidden " >{item.users_enrolled.length} Users</p>
        {
            item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
        ) : item.isCompleted ? (
          <p className="text-green-500 text-xs font-medium">Completed</p>
        ) : (
          <div className="flex">
          <img  className="w-10 cursor-pointer"  src="./src/assets/cancel_icon.svg" alt="" onClick={()=> cancelClass(item._id)} />
          <img   className="w-10 cursor-pointer"  src="./src/assets/tick_icon.svg" alt="" onClick={()=> completeClass(item._id)}/>
          </div>
        
        )
          }

          </div>
        ))
      }

    </div>

    </div>
    )
  )
}

export default AllClasses