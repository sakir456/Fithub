import Button from "./Button";
import SectionHeader from "./SectionHeader";

const TeamMembersText = () => {
  return (
    <div className="md:px-20 px-6 pt-5  flex md:justify-between justify-center items-center  flex-col md:flex-row   font-teko ">
      <div className="flex flex-col sm:gap-5">
      <SectionHeader title="Our Team Members" textColor="text-primary" bgColor="bg-primary" />
        <p className="flex flex-col flex-wrap  text-indigo-950 justify-center  md:font-bold font-semibold  md:text-5xl sm:text-4xl text-3xl uppercase  ">Our Most Experienced 
        <br/> 
        <div>Trainers</div>
        </p>
      </div>
      <div>
        <Button label="Explore More" navigatePath="/all-trainers" visibility="hidden md:block"/>
      </div>
    </div>
  );
};

export default TeamMembersText;
