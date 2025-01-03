import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddClassSchedule = () => {
  const { trainers, backendUrl, aToken, getAllTrainers } = useContext(AdminContext);

  
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("7:00-8:00");
  const [className, setClassName] = useState("Weight Lifting");
  const [trainerName, setTrainerName] = useState("Select Trainer");
  const [trainerId, setTrainerId] = useState("")


  const selectTrainer = (e)=> {
      const selectedTrainerId = e.target.value
      const selectedTrainer = trainers.find((item)=> item._id ===selectedTrainerId)
      
      setTrainerId(selectedTrainerId)
      setTrainerName(selectedTrainer ? selectedTrainer.name : "Select Trainer")
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!date || trainerName === "Select Trainer") {
      return toast.warn("Please select all fields");
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-class",
        { date, timing, className, trainerName, trainerId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDate("");
        setTiming("7:00-8:00");
        setClassName("Weight Lifting");
        setTrainerName("Select Trainer");
        setTrainerId("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(()=> {
    if(aToken){
      getAllTrainers()
    }
   },[aToken])

 

 

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="font-medium text-lg mb-3">Add Class</p>
      <div className="bg-white p-8 w-full max-w-4xl border rounded  max-h-[80vh] overflow-y-scroll ">
        <div className=" flex flex-col lg:flex-row items-start gap-10 mb-6   text-gray-600 ">
          <div className=" w-full lg:flex-1 flex flex-col gap-3">
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Date</p>
              <input type="Date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border rounded"/>
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Timing</p>
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="7:00-8:00">7:00-8:00</option>
                <option value="8:00-9:00">8:00-9:00</option>
                <option value="9:00-10:00">9:00-10:00</option>
                <option value="4:00-5:00">4:00-5:00</option>
                <option value="5:00-6:00">5:00-6:00</option>
                <option value="6:00-7:00">6:00-7:00</option>
              </select>
            </div>
          </div>
          <div className=" w-full lg:flex-1 flex flex-col gap-3">
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Class Name</p>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="Weight Lifting">Weight Lifting</option>
                <option value="Boxing">Boxing</option>
                <option value="Jumba Class">Jumba Class</option>
                <option value="Yoga Class">Yoga Class</option>
                <option value="Dance Class">Dance Class</option>
                <option value="Nutrition Class">Nutrition Class</option>
              </select>
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Trainer Name</p>
              <select
                value={trainerId}
                onChange={selectTrainer}
                className="px-3 py-2 border rounded"
              >
                <option value="">Select Trainer</option>
                {trainers.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="Submit"
          className="px-10 py-3 rounded-full bg-primary text-white "
        >
          Add Class
        </button>
      </div>
    </form>
  );
};

export default AddClassSchedule;
