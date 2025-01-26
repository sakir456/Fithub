import { useContext,  useState } from "react"
import SectionHeader from "./SectionHeader"

import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const WorkOutForm = () => {
  const {token} = useContext(AppContext)

    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("Select Gender")
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [fitnessLevel, setFitnessLevel] = useState("Select Fitness Level")
    const [fitnessGoals, setFitnessGoals] = useState("")
    const [medicalConditions, setMedicalConditions] = useState("")
    const [workOutPlan, setWorkOutPlan] = useState("")
    const navigate = useNavigate()


    


    const submitHandler = async(e)=> {
        e.preventDefault()
        if(!token){
            toast.warn("Login to Generate Workout Plan")
            navigate("/login")
          }
          setWorkOutPlan("")
        if(!age || gender === "Select Gender" || !height || !weight ||   fitnessLevel === "Select Fitness Level" || !fitnessGoals  ){
            return toast.warn("Please select all fields")
        }
        const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_URL.replace('http', 'ws')}`);

    ws.onopen = () => {
        console.log('WebSocket connection established');

        // Send data over WebSocket after connection is established
        const workoutRequestData = {
             age,
            gender,
            height,
            weight,
            fitnessLevel,
            fitnessGoals,
            medicalConditions,
            token
        };

        ws.send(JSON.stringify(workoutRequestData));  // Send workout plan request via WebSocket
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
        setWorkOutPlan(prevPlan => prevPlan + event.data); // Append new data to the workout plan
    };

    // Handle WebSocket error
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Error connecting to server');
    };

    // Handle WebSocket connection close
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    // Reset form data
    setAge(0);
    setGender("Select Gender");
    setHeight(0);
    setWeight(0);
    setFitnessLevel("Select Fitness Level");
    setFitnessGoals("");
    setMedicalConditions("");
    }

 

  return (
    <div className="px-6 pt-10 pb-20 font-teko flex  flex-col gap-2  items-center w-full text-indigo-950" >
    <SectionHeader title="Workout Plan" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap lg:text-5xl sm:text-4xl text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Achieve More with AI-Generated Fitness Plans. </p>
    <form onSubmit={submitHandler}  className=" flex flex-1  flex-col w-full max-w-4xl border shadow-lg p-5 py-10  mt-5  gap-7 font-barlow">
     <div className="flex md:flex-row flex-col  md:gap-5 gap-7 w-full">
     <div className="flex flex-col gap-1.5  w-full text-sm">
     <span className="font-medium"> Age</span>
    <input type="number" placeholder="Enter Age" value={age} onChange={(e)=> setAge(e.target.value)}  className="px-3 py-3 border  m outline-none focus:border-primary"/>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm" >
    <span className="font-medium">Select Gender</span>
    <select value={gender} onChange={(e)=> setGender(e.target.value)} className="px-3 py-3 border m  outline-none ">
        <option value="Select Gender">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
    </select>
    </div>
  </div>
  <div className="flex md:flex-row flex-col  md:gap-5 gap-7 w-full">
  <div className="flex flex-col gap-1.5  w-full text-sm" >
  <span className="font-medium"> Height(cm)</span>
    <input type="number" value={height} onChange={(e)=> setHeight(e.target.value)} placeholder="Height (cm)"  className="px-3 py-3 border  outline-none focus:border-primary"/>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm">
    <span className="font-medium"> Weight(Kg)</span>
    <input type="number" value={weight} onChange={(e)=> setWeight(e.target.value)}  placeholder="Weight (Kg)"  className="px-3 py-3 border outline-none focus:border-primary"/>
    </div>
  </div>
  <div className="flex flex-col gap-1.5  w-full text-sm">
  <span className="font-medium">Fitness Level</span>
  <select value={fitnessLevel} onChange={(e)=> setFitnessLevel(e.target.value)} className="px-3 py-3 border   outline-none ">
        <option value="Select Fitness Level"> Select Fitness Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
    </select>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm">
    <span className="font-medium">Fitness Goals</span>
    <textarea type="text" value={fitnessGoals} onChange={(e)=> setFitnessGoals(e.target.value)} placeholder="E.g., Build muscle, lose weight, improve endurance..."  className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary" rows={3}/>
   </div>
   <div className="flex flex-col gap-1.5  w-full text-sm">
   <span className="font-medium">Medical Conditions (if any)</span>
    <textarea type="text" value={medicalConditions} onChange={(e)=> setMedicalConditions(e.target.value)} placeholder="Medical Conditions (if any)"  className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary" rows={3}/>
   </div>
   <div className="w-full flex items-start">
    <button className="py-4 px-10  text-primary border border-primary font-teko tracking-widest hover:bg-primary hover:text-white transition-all">Generate</button>
   </div>
     </form>
     {workOutPlan && (
      <div className="  flex flex-col gap-1.5  w-full mt-10   text-sm max-w-4xl font-barlow">
      <span className="font-medium">Workout Plan:</span>
     <textarea type="text" value={workOutPlan}  placeholder="WorkOut Plan"  className="border shadow-lg   p-5 py-10 max-sm:py-5 outline-none focus:border-primary overflow-y-scroll" rows={40} readOnly/>
   </div>
    )}

    </div>
  )
}

export default WorkOutForm