import { useState } from "react"



const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="">
    <div className=" sticky z-10   bg-gray-950 font-teko lg:px-10 md:px-8 sm:px-5 max-sm:px-3">
       <div className="flex items-center">
       <div className="max-sm:h-10 max-sm:w-10 flex flex-1">
       <img 
        src="/src/assets/logo/logo.png"/> 
        </div>

       <div className=" hidden lg:flex gap-12 items-center text-white text-lg">
        <ul className="flex lg:gap-12 gap-7 py-10">
          <li>Home</li>
          <li>Schedule</li>
          <li>All Trainers</li> 
          <li>Workout Plans</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
        <button className="relative px-9 py-4 text-lg uppercase overflow-hidden bg-primary group">
            <span className="relative z-10 text-white ">Create Account</span>
            <div className="absolute inset-0 bg-primary-hover transform scale-x-0 origin-left transition-transform duration-300 ease-linear group-hover:scale-x-100"></div>
        </button>
       </div>
     <button onClick={()=>setShowMenu(!showMenu)} className=" block lg:hidden text-primary py-8" >
       <img 
       className="w-7 h-7 max-sm:h-6 max-sm:w-6" 
       src="/src/assets/elements/horizontal-bars.png" />
    </button>
    </div>
       </div>
       {/* mobile menu */}
       
       <div className= {` ${showMenu ? "max-h-96 opacity 100" : "max-h-0 opacity-0"} sticky z-10  font-barlow  block lg:hidden md:px-8 px-0 overflow-hidden transition-all duration-500 ease-linear `}>
       <div className="bg-[#F8F9FD] border border-gray-100 py-7 px-7  text-gray-950">
       <ul className="flex flex-col gap-4">
       <li>Home</li>
          <li>Schedule</li>
          <li>All Trainers</li> 
          <li>Workout Plans</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
        </div>

       </div>
       
       </div>
   
  )
}

export default Navbar