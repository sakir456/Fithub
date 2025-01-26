import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


const MembersList = () => {
  const {aToken, getAllUsers, users} = useContext(AdminContext)

  const calculateAge = (dob)=> {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear()  - birthDate.getFullYear()
    age = isNaN(age) ? "-" : age
    return age
  }


  useEffect(()=> {
   if(aToken){
    getAllUsers()
   }
  },[aToken])

  return (
    <div className="w-full max-w-6xl m-5">
    <p className="mb-3 text-lg font-medium">All Members</p>
    <div className="bg-white border  rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
      <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr_1fr] gap-1    py-3 px-6 border-b ">
        <p>#</p>
        <p> Name</p>
        <p>Email</p>
        <p>Age</p>
        <p>Gender</p>
        <p>Phone No.</p>
        <p>PlanType</p>
      </div>
      {
        users.map((item,index)=> (
          <div className="flex flex-wrap justify-between max-sm:text-base max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr_1fr] gap-1 items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50"  key={index}>
          <p className="max-sm:hidden ">{index + 1}</p>
          <div className="flex items-center gap-1">
          <img className="w-8 rounded-full" src={item.image} alt=""/>
          <p>{item.name}</p>
          </div>
          <p>{item.email}</p>  
          <p>{calculateAge(item.dob)}</p>
          <p>{item.gender}</p>
          <p className="max-sm:hidden">{item.phone}</p>
           {
            item.planType === "Not a Member" ? (
            <p className=" text-xs text-red-400  font-medium">N/A</p>
        ) : 
          <p className="   text-xs text-green-500 font-medium">{item.planType}</p>
        } 
          

          </div>
        ))
      }
      </div>
      </div>
  )}

export default MembersList