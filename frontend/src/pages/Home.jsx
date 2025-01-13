import { useEffect, useState } from "react";


import About from "../components/About";
import Classes from "../components/Classes";
import Trainers from "../components/Trainers";
import TeamMembersText from "../components/TeamMembersText";
import Button from "../components/Button";
import Services from "../components/Services";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="">
      <div className="min-h-screen  bg-[url('/src/assets/hero/h1_hero.png')] bg-fixed  bg-cover    bg-no-repeat font-teko flex items-center justify-center relative  ">
        <div className="w-full  md:pl-5  flex justify-around max-sm:justify-center  max-sm:px-2 items-center  ">
          <div className="w-1/2 max-sm:w-full flex flex-col max-sm:items-center xl:gap-8 sm:gap-6 max-sm:gap-3 text-white  overflow-hidden">
            <div
              className={`flex gap-4 max-sm:gap-0.5 items-center text-primary max-sm:text-center transition-transform duration-700 ease-out delay-100 ${
                isVisible
                  ? " translate-x-0 opacity-100"
                  : " -translate-x-full opacity-0"
              }`}
            >
              <hr className="border-none outline-none h-0.5 bg-primary w-10" />
              <p className="text-2xl max-sm:text-center font-light uppercase tracking-wide">
                With Patrick Potter
              </p>
            </div>
            <div
              className={`text-wrap max-sm:text-center xl:text-7xl lg:text-6xl sm:text-5xl max-sm:text-3xl font-bold uppercase leading-tight transition-transform duration-700 ease-out delay-300 ${
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
             
              <Button   label="Become a Member" navigatePath="/contact" />
            </div>
          </div>

          <div></div>
        </div>
      </div>
    <About/>
    <Services/>
    <TeamMembersText/>
    <Trainers/>
    <Classes/>

    </div>
  );
};

export default Home;
