import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import About from "../components/About";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="">
      <div className="min-h-screen    bg-[url('/src/assets/hero/h1_hero.png')] bg-cover max-sm:bg-contain   bg-no-repeat font-teko flex items-center justify-center relative  ">
        <div className="w-full  md:pl-5  flex justify-around items-center  ">
          <div className="w-1/2 flex flex-col xl:gap-8 sm:gap-6 sm: text-white max-sm:hidden overflow-hidden">
            <div
              className={`flex gap-4 items-center text-primary transition-transform duration-700 ease-out delay-100 ${
                isVisible
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              <hr className="border-none outline-none h-0.5 bg-primary w-10" />
              <p className="text-2xl font-light uppercase tracking-wide">
                With Patrick Potter
              </p>
            </div>
            <div
              className={`text-wrap xl:text-7xl lg:text-6xl sm:text-5xl font-bold uppercase leading-tight transition-transform duration-700 ease-out delay-300 ${
                isVisible
                  ? " translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              Build Perfect body Shape for good and Healthy life.
            </div>
            <div
              className={`transition-transform duration-700 ease-out delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <button
                onClick={() => navigate("/contact")}
                className=" relative  w-48 text-center py-4 text-lg uppercase overflow-hidden  bg-primary group text-nowrap "
              >
                <span className="relative z-10 tracking-wide text-white">
                  Became a member
                </span>
                <div
                  className="absolute inset-0 bg-primary-hover transform scale-x-0 
      origin-left transition-transform duration-300 ease-linear group-hover:scale-x-100 text-white  "
                ></div>
              </button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
       <About/>
    </div>
  );
};

export default Home;
