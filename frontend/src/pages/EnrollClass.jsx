import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import GymClass from "../components/GymClass"


const EnrollClass = () => {
  const {classId} = useParams()
  const {classes}  = useContext(AppContext)

  const [classInfo, setClassInfo] = useState(null)

 const fetchClassInfo = async()=>{
    const classInfo =  classes.find(item => item._id ===classId)
    setClassInfo(classInfo)
    console.log(classInfo)
  } 

  

useEffect(()=> {
  fetchClassInfo()
},[classes, classId])
  
  return (
    <div>
      <div className="   w-full h-96 bg-[url('/assets/hero/hero2.png')] flex justify-center items-center ">
      <div className="text-white font-bold text-5xl max-sm:text-4xl font-teko ">Enroll For Class</div>
    </div>
    <GymClass classInfo={classInfo} classId={classId}/>
    </div>
  )
}

export default EnrollClass