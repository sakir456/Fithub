import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


const MembersList = () => {
  const {aToken, getAllUSers, users, setUsers} = useContext(AdminContext)


  useEffect(()=> {
   if(aToken){
    getAllUSers()
   }
  },[aToken])

  return (
    <div className="w-full max-w-6xl m-5">
    <p className="mb-3 text-lg font-medium">All Classes</p>
    <div className="bg-white border  rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
      <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr_1fr] gap-1  py-3 px-6 border-b">
        <p>#</p>
        <p> Name</p>
        <p>Date & Day</p>
        <p>Time</p>
        <p>Duration</p>
        <p>Category</p>
        <p>Action</p>
      </div>
      </div>
      </div>
  )}

export default MembersList