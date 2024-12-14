import { useContext, useEffect } from "react"
import { TrainerContext } from "../../context/TrainerContext"


const TrainerDashboard = () => {

  const {getDashData, dashData, tToken, cancelClass, completeClass}  = useContext(TrainerContext)

  const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

  const extractDate  = (dateISOString)=> {
       const date = new Date(dateISOString)
       const day = date.getDate()
       const month = monthsofYear[date.getMonth()]
       const fullYear = date.getFullYear()

       return `${day} ${month} ${fullYear}`
  }

  useEffect(()=> {
    if(tToken){
      getDashData()
      }
  }, [tToken])

  return dashData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3 ">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-red-600 hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/calendar.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.totalClasses}</p>
          <p className='text-gray-400'>Total Classes</p>
        </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-red-600 hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/badge.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.isCompleted}</p>
          <p className='text-gray-400'>Completed</p>
        </div>
        </div>
       <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-red-600 hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/hourglass.png" alt="Trainer img"/>
        <div className='flex flex-col justify-center ml-2 text-gray-500 '>
          <p className='text-xl font-semibold text-gray-600'>{dashData.cancelled}</p>
          <p className='text-gray-400'>Cancelled</p>
        </div>
        </div>
      </div>

      <div className="bg-white mt-10">
      <div className="flex gap-2 p-4 rounded border-2 border-gray-100 ">
        <img className="w-7" src="/src/assets/classList.png"/>
        <p className="font-semibold">Upcoming Classes</p>
      </div>
      <div className="pt-5">
        {
          dashData.classes.map((item,index)=> (
            <div key={index} className=" px-10 py-3  hover:bg-gray-300">
              <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">{item.className}</p>
                <p className="text-gray-600 text-sm">{extractDate(item.date)}</p>
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
}

export default TrainerDashboard