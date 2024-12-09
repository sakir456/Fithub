import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom"
import { ChartNoAxesColumnIncreasing, ClipboardList, NotepadText, UserPen, UserPlus, Users } from "lucide-react"
import { TrainerContext } from "../context/TrainerContext"


const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {tToken} = useContext(TrainerContext)
  return (
    <div className="h-screen bg-white border-r" >
    {
       aToken && <ul className="mt-5 text-[#515151]">
       <NavLink 
       to={"/admin-dashboard"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <ChartNoAxesColumnIncreasing />
       <p className="hidden md:block">Dashboard</p>
       </NavLink>

       

       <NavLink 
       to={"/trainers"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <Users />
       <p className="hidden md:block">Trainers List</p>
       </NavLink>

       <NavLink 
       to={"/members"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <Users />
       <p className="hidden md:block">Members List</p>
       </NavLink>

       <NavLink 
       to={"/addmemberandtrainer"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
         <UserPlus />
       <p className="hidden md:block">Add Member/Trainer</p>
       </NavLink>

       <NavLink 
       to={"/class-schedule"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
           <ClipboardList />
       <p className="hidden md:block">Class Schedule</p>
       </NavLink>
     </ul>
                  
       
    } 

    {
      tToken && (
        <ul className="mt-5 text-[#515151]">
        <NavLink 
       to={"/trainer-dashboard"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <ChartNoAxesColumnIncreasing />
       <p className="hidden md:block">Dashboard</p>
       </NavLink>

       <NavLink 
       to={"/trainer-classes"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <NotepadText />
       <p className="hidden md:block">Classes</p>
       </NavLink>
       
       <NavLink 
       to={"/trainer-profile"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-red-600" : ""}`}>
       <UserPen />
       <p className="hidden md:block">Profile</p>
       </NavLink>

        </ul>
      )
    }
        
    </div>
  )
}

export default Sidebar