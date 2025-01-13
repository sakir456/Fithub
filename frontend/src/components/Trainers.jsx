import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SectionHeader from "./SectionHeader";

const Trainers = () => {
  const { trainers } = useContext(AppContext);
  return (
    <div className="px-6 md:pt-5  pb-10 font-teko flex flex-col gap-2 items-center">
     

      <div className="   flex flex-wrap justify-center items-center gap-3 pt-5 gap-y-6">
        {trainers.map((item, index) => (
          <div className=" " key={index}>
            <div className=" relative group   border border-red-200   w-[280px] h-[330px]  overflow-hidden   cursor-pointer group ">
              <img className="  " src={item.image} alt="" />
              <div
                className="absolute   transform scale-y-0 
              origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 flex flex-col gap-2 text-lg   bottom-0 w-full h-24 pt-3 px-3  bg-primary text-white "
              >
               <SectionHeader title={item.speciality} textColor="text-white" bgColor="bg-white"/>
                <p className="text-lg">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
