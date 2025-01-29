import { IoFitness } from "react-icons/io5"
import { useNavigate } from "react-router-dom"




const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex   justify-center items-center    bg-[url('/src/assets/gallery/section_bg03.png')] mt-16 bg-fixed  bg-cover    bg-no-repeat font-barlow text-white">
    <div className="w-full xl:max-w-6xl lg:max-w-5xl p-8  lg:p-0 max-sm:px-4   flex flex-col   lg:gap-32 gap-20 max-sm:gap-10 ">
    <div className="flex lg:flex-row flex-col gap-4 lg:gap-0 justify-between lg:justify-around ">
      <div>
        <p className="font-teko text-lg font-semibold uppercase">Company</p>
        <ul className="flex flex-col gap-3 lg:mt-8 mt-2   text-gray-400">
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/about")} >About Us</li>
        <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/all-trainers")}>Our Trainers</li>
        <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/membership-plans")}>Membership Plans</li>
        <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/workout-plans")}> WorkoutPlans</li>
        </ul>
      </div>
      <div>
      <p className="font-teko text-lg font-semibold uppercase">Open Hours</p>
      <ul className="flex flex-col gap-3 lg:mt-8 mt-2  text-gray-400">
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")} >Monday: 6am - 10pm</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Tuesday-Friday: 6am - 9pm</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1  duration-300 transition-all" onClick={()=>navigate("/schedule")}>Saturday: 8am - 8pm</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Sunday: 8am - 6pm</li>
      </ul>
      </div>
      <div>
      <p className="font-teko text-lg font-semibold uppercase">Programs</p>
      <ul className="flex flex-col gap-3 lg:mt-8 mt-2   text-gray-400">
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Strength Training</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Cardio Workouts</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Yoga Classes</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1 duration-300 transition-all" onClick={()=>navigate("/schedule")}>Personal Training</li>
        <li className="cursor-pointer  hover:text-white hover:translate-x-1  duration-300 transition-all" onClick={()=>navigate("/schedule")}>Nutrition Plans</li>
      </ul>
      </div>
      <div className="mt-2 lg:mt-0">
        <div className='flex items-center gap-0.5 font-teko  text-primary   text-4xl max-sm:text-3xl font-semibold '>
        <IoFitness />
        <span className='text-white  '>FITHUB </span>
        </div>
        <p className="lg:mt-8 mt-2  text-gray-400">Join us to unlock your potential <br/> with the best trainers, top-notch<br/> equipment, and tailored workout<br/> programs.</p>
        
      </div>
    </div>
    <div className="flex flex-col lg:gap-16 gap-5" >
    
     <hr className="border-gray-400" />
     
    <p className="text-center text-gray-400">Copyright ©2025 All rights reserved </p>
    </div>
    </div>
       
    </div>
  )
}

export default Footer