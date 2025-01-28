import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import LoadingSpinner from "../../components/LoadingSpinner"

const Dashboard = () => {
  const {getDashData, dashData, aToken, cancelClass, completeClass, loading}  = useContext(AdminContext)
  
    const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
  
    const extractDate  = (dateISOString)=> {
         const date = new Date(dateISOString)
         const day = date.getDate()
         const month = monthsofYear[date.getMonth()]
         
         return `${day} ${month} `
    }
  
    useEffect(()=> {
      if(aToken){
        getDashData()
        }
    }, [aToken])
  
  return  (
    loading ? (
      <LoadingSpinner/>
    ): dashData &&(
    <div className="m-5 ">
   <div className="flex flex-wrap gap-3 ">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-primary hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/calendar.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.totalClasses}</p>
          <p className='text-gray-400'>Total Classes</p>
        </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-primary hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/badge.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.isCompleted}</p>
          <p className='text-gray-400'>Completed</p>
        </div>
        </div>
       <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-primary hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/cross.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.cancelled}</p>
          <p className='text-gray-400'>Cancelled</p>
        </div>
        </div>
      </div>

      <div className="bg-white mt-10">
      <div className="flex items-center gap-2.5 p-4 rounded-t border ">
        <img className="w-7" src="/src/assets/classList.png"/>
        <p className="font-semibold">Upcoming Classes</p>
      </div>
      <div className="pt-4 border border-t-0">
        {
          dashData.classes.map((item,index)=> (
            <div key={index} className=" px-6 py-3  hover:bg-gray-300">
              <div className="flex gap-3  items-center">
              <div className="flex-1 text-sm">
                <p className=" font-medium text-gray-800">{item.className}</p>
                <div className="flex gap-1">
                <p className="text-gray-600 ">{extractDate(item.date)}</p>
                <p className="text-gray-600 ">{item.timing}</p>
                </div>
              </div>
              {
            item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
        ) : item.isCompleted ? (
          <p className="text-green-500 text-xs font-medium">Completed</p>
        ) : (
          <div className="flex">
          <img onClick={() => cancelClass(item._id)} className="w-10 cursor-pointer"  src="./src/assets/cancel_icon.svg" alt="" />
          <img onClick={()=> completeClass(item._id)}  className="w-10 cursor-pointer"  src="./src/assets/tick_icon.svg" alt=""/>
          </div>
        
        )
          }
          </div>
            </div>
          ))
        }
      </div>

      </div>
      
    </div>
    )
  )
}

export default Dashboard