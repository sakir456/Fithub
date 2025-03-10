import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const AddClassSchedule = () => {
  const { trainers, backendUrl, aToken, getAllTrainers,loading, setLoading } = useContext(AdminContext);

  
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("7:00am-8:00am");
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
    setLoading(true)
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-class",
        { date, timing, className, trainerName, trainerId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDate("");
        setTiming("7:00am-8:00am");
        setClassName("Weight Lifting");
        setTrainerName("Select Trainer");
        setTrainerId("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=> {
    if(aToken){
      getAllTrainers()
    }
   },[aToken])

  return (
    loading ? (
      <LoadingSpinner/>
    ) : (
    <form onSubmit={onSubmitHandler} className="m-5  w-full">
      <p className="mb-3 text-lg font-medium">Add Class</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className=" flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className=" w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 ">
              <p>Date</p>
              <input type="Date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2"/>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Timing</p>
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="7:00am-8:00am">7:00am-8:00am</option>
                <option value="8:00am-9:00am">8:00am-9:00am</option>
                <option value="9:00am-10:00am">9:00am-10:00am</option>
                <option value="4:00pm-5:00pm">4:00pm-5:00pm</option>
                <option value="5:00pm-6:00pm">5:00pm-6:00pm</option>
                <option value="6:00pm-7:00pm">6:00pm-7:00pm</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 ">
              <p>Class Name</p>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="Weight Lifting">Weight Lifting</option>
                <option value="Boxing">Boxing</option>
                <option value="Jumba Class">Jumba Class</option>
                <option value="Yoga Class">Yoga Class</option>
                <option value="Dance Class">Dance Class</option>
                <option value="Nutrition Class">Nutrition Class</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1 ">
              <p>Trainer Name</p>
              {trainers &&(
              <select
                value={trainerId}
                onChange={selectTrainer}
                className="border rounded px-3 py-2   "
              >
                <option value="">Select Trainer</option>
                {trainers.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              )}
            </div>
          </div>
        </div>
        <button
          type="Submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Class
        </button>
      </div>
    </form>
    )
  );
};

export default AddClassSchedule;
