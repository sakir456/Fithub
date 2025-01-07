import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Trainers = () => {
  const { trainers } = useContext(AppContext);
  return (
    <div className="px-6 pt-10 pb-20 font-teko flex flex-col gap-2 items-center">
      <div className="flex  gap-2 items-center text-primary ">
        <hr className="border-none outline-none h-0.5 bg-primary w-10" />
        <p className="text-2xl sm:text-xl max-sm:text-lg font-light uppercase md:tracking-wide">
          Our Team Members
        </p>
      </div>
      <p className=" flex flex-wrap md:text-4xl text-2xl sm:text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">
        Our Most Experienced Team Members
      </p>

      <div className="   flex flex-wrap justify-center items-center gap-7 pt-5 gap-y-6">
        {trainers.map((item, index) => (
          <div className=" " key={index}>
            <div className=" relative group   border border-red-200   w-[320px] h-[450px] max-sm:w-[275px] max-sm:h-[375px] overflow-hidden   cursor-pointer group ">
              <img className="  " src={item.image} alt="" />
              <div
                className="absolute   transform scale-y-0 
              origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 flex flex-col gap-3 text-lg   bottom-0 w-full h-32 pt-5 px-5  bg-primary text-white "
              >
                <div className="flex   gap-4 items-center text-white ">
                  <hr className="border-none outline-none h-0.5 bg-white   w-10" />
                  <p className="text-2xl sm:text-xl max-sm:text-lg font-light uppercase md:tracking-wide">
                  {item.speciality} 
                  </p>
                </div>
                <p className="text-xl">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
