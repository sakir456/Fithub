import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom"
import { ChartNoAxesColumnIncreasing, ClipboardList, NotepadText, UserPen, UserPlus, Users, MessageSquare } from "lucide-react"
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
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <ChartNoAxesColumnIncreasing />
       <p className="hidden md:block">Dashboard</p>
       </NavLink>

       

       <NavLink 
       to={"/trainers"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <Users />
       <p className="hidden md:block">Trainers List</p>
       </NavLink>

       <NavLink 
       to={"/members"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <Users />
       <p className="hidden md:block">Members List</p>
       </NavLink>

       <NavLink 
       to={"/all-classes"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <ClipboardList />
       <p className="hidden md:block">Classes</p>
       </NavLink>

       <NavLink 
       to={"/addtrainer"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
         <UserPlus />
       <p className="hidden md:block">Add Trainer</p>
       </NavLink>

       <NavLink 
       to={"/class-schedule"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
           <ClipboardList />
       <p className="hidden md:block">Class Schedule</p>
       </NavLink>

       <NavLink 
       to={"/user-queries"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
          <MessageSquare />
       <p className="hidden md:block">User Queries</p>
       </NavLink>
     </ul>
                  
       
    } 

    {
      tToken && (
        <ul className="mt-5 text-[#515151]">
        <NavLink 
       to={"/trainer-dashboard"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <ChartNoAxesColumnIncreasing />
       <p className="hidden md:block">Dashboard</p>
       </NavLink>

       <NavLink 
       to={"/trainer-classes"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
       <NotepadText />
       <p className="hidden md:block">Classes</p>
       </NavLink>
       
       <NavLink 
       to={"/trainer-profile"}
       className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 ${isActive ? "bg-red-50 border-r-4 border-primary" : ""}`}>
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