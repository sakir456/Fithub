

const About = () => {
  return (
    <div className=" xl:px-44 lg:px-36 md:px-28 xl:pt-44 px-5  py-10">
        <div className="flex lg:flex-row  flex-col  items-center lg:gap-20 gap-10 max-sm:gap-5">
           <div className="lg:w-1/2 ">
            <img src="/src/assets/gallery/about.png"/>
           </div>
           <div className="lg:w-1/2 flex justify-center items-center flex-col font-teko lg:pt-20    ">
           <div  className="flex  gap-2 items-center text-primary transition-transform duration-700 ease-out delay-100">
              <hr className="border-none outline-none h-0.5 bg-primary w-10" />
              <p className="text-2xl sm:text-xl max-sm:text-lg font-light uppercase md:tracking-wide">
                About FitHub
              </p>
            </div>
            <p className="font-bold  xl:text-5xl md:text-4xl sm:text-2xl max-sm:text-lg md:!leading-tight sm:mt-5 uppercase  text-left">Welcome to Fithub, your ultimate solution for managing gym operations.</p>
            <p className="font-barlow  text-xs md:text-base   text-left">At Fithub, we understand the challenges gym owners, trainers, and members face when it comes to organizing schedules, tracking progress, and maintaining memberships.</p>
            <p className="font-barlow mt-2  text-xs md:text-base  p text-left">Our vision at Fithub is to create a connected and empowered fitness community. By bridging the gap between gym management and member experience, we aim to make fitness accessible, engaging, and efficient for all.</p>
            <p className="font-barlow mt-2   text-xs  md:text-base text-left">Fithub is committed to innovation in fitness technology. We continuously strive to enhance our platform with cutting-edge features, including AI-powered recommendations and tools to improve your overall fitness experience. Whether you are scheduling your first class or managing a thriving gym, Fithub is here to help you achieve your goals effortlessly.</p>
           </div> 
        </div>
    </div>
  )
}

export default About