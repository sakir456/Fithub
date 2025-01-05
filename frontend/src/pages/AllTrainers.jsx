import Trainers from "../components/Trainers"


const AllTrainers = () => {
  return (
    <div>
       <div className="   w-full h-96 bg-[url('/src/assets/hero/hero2.png')] flex justify-center items-center ">
      <div className="text-white font-bold text-5xl max-sm:text-4xl font-teko ">Our Trainers</div>
    </div>
    <Trainers />
    </div>
  )
}

export default AllTrainers