import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


const TrainersList = () => {
 const {trainers, setTrainers,getAllTrainers,aToken} = useContext(AdminContext)

 useEffect(()=> {
  if(aToken){
    getAllTrainers()
  }
 },[aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <p className=" font-medium text-lg ">All Trainers</p>
      <div className=" w-full flex flex-wrap gap-4 pt-5 gap-y-6">
      {
        trainers.map((item, index) => (
          <div className="  border border-red-200 rounded-xl max-w-56 max-h-80  overflow-scroll cursor-pointer group   " key={index}>
            <img className="" src={item.image} alt=""/>
            <div className="p-4">
            <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
            <p className="text-zinc-600 text-sm">{item.speciality}</p>
            <p className="text-zinc-600 text-sm">{item.experience}</p>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default TrainersList