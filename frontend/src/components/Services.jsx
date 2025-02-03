import { useNavigate } from "react-router-dom";
import services from "../data/ServicesData";
import SectionHeader from "./SectionHeader";

const Services = () => {
  const navigate = useNavigate()
    
    return (
        <div className="min-h-screen xl:px-48 md:py-48 md:px-32 lg:px-32 sm:px-28 max-sm:px-4 max-sm:py-24  px-9 py-16   mt-16  bg-[url('/assets/gallery/section_bg01.png')] bg-fixed  bg-cover   bg-no-repeat font-teko flex justify-center    ">
        <div className="flex  flex-col gap-24 justify-center">
          <div className="flex flex-col    gap-8 max-sm:gap-3">
          <SectionHeader title="Our Services For You" textColor="text-primary" bgColor="bg-primary" />
          <p className="flex flex-col flex-wrap  text-white justify-start font-bold md:text-5xl text-4xl max-sm:text-3xl uppercase  ">PUSH YOUR LIMITS FORWARD
           <br/>
          <span className="">WE OFFER FOR YOU</span>
           </p>
          </div>  
          <div className="flex flex-wrap gap-8 ">
            {
              services.map((item,index)=> (
                <div className=" relative group flex  flex-col gap-5 flex-1 justify-center items-center py-16 pb-28 px-12  bg-white font-teko" key={index}>
                  <img className="w-12 " src={item.image}/>
                  <p className="uppercase text-xl mt-5 flex flex-wrap justify-center">{item.title}</p>
                  <p className="font-barlow flex flex-wrap justify-center">{item.description}</p>
                  <div
                className="absolute   transform scale-y-0 
              origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 flex justify-center cursor-pointer  text-lg   bottom-0 w-full h-14 pt-3   bg-primary text-white "
              >
              <p className="text-lg flex justify-center gap-3" onClick={()=>navigate("/contact")}>Contact Us <span>➔</span>  </p>
              </div>
                </div>
              ))
            }
          </div>  
        </div>
        </div>
    );
};

export default Services;