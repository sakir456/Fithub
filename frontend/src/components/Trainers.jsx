import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SectionHeader from "./SectionHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Trainers = () => {
  const { trainers,loading } = useContext(AppContext);
  return (
    <div className="px-6 mt-10   font-teko flex flex-col gap-2 items-center">
     

      <div className="   flex flex-wrap justify-center items-center gap-3 pt-5 gap-y-6">
        { 
          loading ? (
           Array(trainers.length || 5).fill(0).map((_, index) => (
              <div key={index} className="w-[280px] h-[330px] border border-gray-200 p-4">
                <Skeleton height={280} />
                <Skeleton width="80%" height={20} className="mt-2" />
              </div>
          ))): trainers && (
          trainers.map((item, index) => (
          <div className=" " key={index}>
            <div className=" relative group      w-[280px] h-[330px] border border-red-200  overflow-hidden   cursor-pointer group ">
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
       ) ))}
      </div>
    </div>
  );
};

export default Trainers;
