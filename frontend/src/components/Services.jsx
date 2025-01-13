import SectionHeader from "./SectionHeader";

const Services = () => {
    return (
        <div className="min-h-screen xl:px-44 lg:px-36 md:px-28  px-5 my-5  bg-[url('/src/assets/gallery/section_bg01.png')] bg-fixed  bg-cover   bg-no-repeat font-teko flex items-center  relative  ">
          <div className="flex flex-col gap-8">
          <SectionHeader title="Our Services For You" textColor="text-primary" bgColor="bg-primary" />
          <p className="flex flex-wrap  text-white justify-center font-bold md:text-5xl text-4xl uppercase  ">PUSH YOUR LIMITS FORWARD<br/> WE OFFER FOR YOU</p>
          </div>  
          <div></div>  
        </div>
    );
};

export default Services;