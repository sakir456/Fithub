import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  ChevronDown,  User  } from "lucide-react"
import { AppContext } from "../context/AppContext";
import { IoFitness } from "react-icons/io5";
import Button from "./Button";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {token, setToken} = useContext(AppContext)
  
  
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logOut = ()=> {
    token && setToken(false)
    token && localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className={`    ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      } font-teko lg:px-10 md:px-8 sm:px-5 max-sm:px-3`}>
        <div className="flex items-center">
        <div className='flex flex-1    items-center gap-0.5 font-teko  text-primary   text-4xl max-sm:text-3xl font-semibold '>
        <IoFitness    />
       <span className='text-white  '>FITHUB </span>
       </div>

          <div className=" hidden lg:flex gap-8 items-center text-white text-lg">
            <ul className="flex lg:gap-12 gap-7 py-10 text-lg font-medium">
              <NavLink to="/">
                <li className="cursor-pointer hover:text-primary  duration-300 ease-in-out">Home</li>
              </NavLink>

              <NavLink to="/schedule">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Schedule</li>
              </NavLink>

             
              <NavLink to="/workout-plans">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Workout Plans</li>
              </NavLink>

              <NavLink to="/membership-plans">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Membership Plans</li>
              </NavLink>

              <NavLink to="/all-trainers">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">All Trainers</li>
              </NavLink>


              
              <NavLink to="/about">
                <li  className="cursor-pointer hover:text-primary duration-300 ease-in-out">About</li>
              </NavLink>

              <NavLink to="/contact">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Contact</li>
              </NavLink>
            </ul>
            {token ? (
            <div className="flex items-center cursor-pointer group relative text-primary ">
            <User   />
            <ChevronDown   />
              <div className="absolute top-0 right-0 pt-16 text-lg font-medium  z-20 hidden group-hover:block">
              <div className=" min-w-48 flex flex-col gap-2.5 p-4 bg-gray-950  bg-opacity-55 text-white">
                <p 
                onClick={()=>navigate("/my-profile")}
                className="cursor-pointer hover:text-primary duration-300 ease-in-out" >My Profile</p>
                <p onClick={()=>navigate("/myclasses")}  className="cursor-pointer hover:text-primary duration-300 ease-in-out">My Classes</p>
                <p onClick={logOut} className="cursor-pointer hover:text-primary duration-300 ease-in-out">Logout</p>
              </div>

              </div>
            </div>
          ) : (
            <Button   label="Create Account" navigatePath="/login" />
          )}
            
          </div>
        
          <button
            onClick={() => setShowMenu(!showMenu)}
            className=" block lg:hidden text-primary py-8"
          >
            <img
              className="w-7 h-7 max-sm:h-6 max-sm:w-6"
              src="/src/assets/elements/horizontal-bars.png"
            />
          </button>
        </div>
      </div>
      {/* mobile menu */}
     <div
        className={` ${
          showMenu ? "max-h-96 " : "max-h-0 "
        }fixed  right-0 left-0 z-20    font-barlow  block lg:hidden md:px-8 px-0 overflow-hidden transition-all duration-500 ease-in-out `}
      >
        <div className=" border border-gray-200 bg-white py-7 max-sm:py-5 px-7 max-sm:px-5 shadow-md text-gray-950">
          <ul className="flex flex-col gap-4 max-sm:gap-2">
          {
            token && (
                <NavLink 
                onClick={()=>setShowMenu(false)}
                 to="/my-profile">
              <li>My Profile</li>
            </NavLink>
              ) 
            }

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/">
              <li>Home</li>
            </NavLink>

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/schedule">
              <li>Schedule</li>
            </NavLink>
           
           { token && (
            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/myclasses">
              <li>My Classes</li>
            </NavLink>
           )}
            
          <NavLink
            onClick={()=>setShowMenu(false)}
             to="/workout-plans"> 
              <li>Workout Plans</li>
            </NavLink>

            
            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/membership-plans"> 
              <li>Membership Plans</li>
            </NavLink>

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/all-trainers">
              <li>All Trainers</li>
            </NavLink>

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/about">
              <li>About</li>
            </NavLink>

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/contact">
              <li>Contact</li>
            </NavLink>

            {
            token ? (
                <NavLink 
                onClick={()=>{setShowMenu(false); logOut()}}
                 >
              <li>Logout</li>
            </NavLink>
              ) : (
                <NavLink
                onClick={()=>setShowMenu(false)}
                 to="/login">
              <li>Sign in/ Sign up</li>
            </NavLink>
              )
            }

           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
