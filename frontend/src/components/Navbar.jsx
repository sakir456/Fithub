import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  ChevronDown, User,  } from "lucide-react"
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {token} = useContext(AppContext)
  
  
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

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className={`    ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      } font-teko lg:px-10 md:px-8 sm:px-5 max-sm:px-3`}>
        <div className="flex items-center">
          <div className="max-sm:h-10 max-sm:w-10 flex flex-1">
            <img src="/src/assets/logo/logo.png" />
          </div>

          <div className=" hidden lg:flex gap-8 items-center text-white text-lg">
            <ul className="flex lg:gap-12 gap-7 py-10 text-lg font-medium">
              <NavLink to="/">
                <li className="cursor-pointer hover:text-primary  duration-300 ease-in-out">Home</li>
              </NavLink>

              <NavLink to="/schedule">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Schedule</li>
              </NavLink>

              <NavLink to="/all-trainers">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">All Trainers</li>
              </NavLink>

              <NavLink to="/workout-plans">
                <li className="cursor-pointer hover:text-primary duration-300 ease-in-out">Workout Plans</li>
              </NavLink>

              <NavLink to="/about">
                <li 
                
                className="cursor-pointer hover:text-primary duration-300 ease-in-out">About</li>
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
                <p className="cursor-pointer hover:text-primary duration-300 ease-in-out">Logout</p>
              </div>

              </div>
            </div>
          ) : (
            <button 
            onClick={()=>navigate("/login")}
            className="relative px-9 py-4 text-lg uppercase overflow-hidden bg-primary group">
              <span className="relative z-10 text-white ">Create Account</span>
              <div className="absolute inset-0 bg-primary-hover transform scale-x-0 
              origin-left transition-transform duration-300 ease-linear group-hover:scale-x-100"></div>
            </button>
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
            token ? (
                <NavLink 
                onClick={()=>setShowMenu(false)}
                 to="/my-profile">
              <li>My Profile</li>
            </NavLink>
              ) : (
                <NavLink
                onClick={()=>setShowMenu(false)}
                 to="login">
              <li>Sign in/ Sign up</li>
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

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/all-trainers">
              <li>All Trainers</li>
            </NavLink>

            <NavLink
            onClick={()=>setShowMenu(false)}
             to="/workout-plans"> 
              <li>Workout Plans</li>
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

           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
