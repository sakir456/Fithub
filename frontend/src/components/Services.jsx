import SectionHeader from "./SectionHeader";

const Services = () => {
    return (
        <div className="min-h-screen xl:px-44 lg:px-36 md:px-28  px-5 my-5  bg-[url('/src/assets/gallery/section_bg01.png')] bg-fixed  bg-cover   bg-no-repeat font-teko flex items-center  relative  ">
          <div className="flex flex-col gap-8 max-sm:gap-3">
          <SectionHeader title="Our Services For You" textColor="text-primary" bgColor="bg-primary" />
          <p className="flex flex-col flex-wrap  text-white justify-start font-bold md:text-5xl text-4xl max-sm:text-3xl uppercase  ">PUSH YOUR LIMITS FORWARD
           <br/>
          <span className="">WE OFFER FOR YOU</span> </p>
          </div>  
          <div></div>  
        </div>
    );
};

export default Services;