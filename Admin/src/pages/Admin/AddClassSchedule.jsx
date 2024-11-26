import { useEffect, useState } from "react"


const AddClassSchedule = () => {
  const [dates, setDates] = useState([])


  function calculateDates(){
       let dateArr = []
      let today = new Date()
      
    for(let i=0; i<7; i++ ){
      let newDate = new Date(today)
    newDate.setDate(today.getDate()+i)
      dateArr.push(newDate)
    }
   
    setDates([...dateArr])
   
 }

 useEffect(() => {
  calculateDates();
}, []);

 


  return (
    <form className="m-5 w-full">
    <p className="font-medium text-lg mb-3">Add Class</p>
    <div className="bg-white p-8 w-full max-w-4xl border rounded  max-h-[80vh] overflow-y-scroll ">
    <div className=" flex flex-col lg:flex-row items-start gap-10 mb-3   text-gray-600">
      <div className=" w-full lg:flex-1 flex flex-col gap-3">
      <div className=" flex-1 flex flex-col gap-1 " >
      <p>Date</p>
        <select className="px-3 py-2 border rounded">
          {
            dates.map((item,index)=> (
              
              <option key={index} value={item.toISOString()}>{item.getDate() + "/" + (item.getMonth() + 1) + "/" +(item.getFullYear())}</option>
            ))
          }
        </select>
        </div>
        <div className=" flex-1 flex flex-col gap-1 ">
        <p>Timing</p>
        <select className="px-3 py-2 border rounded">
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
        <select className="px-3 py-2 border rounded">
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
        <select className="px-3 py-2 border rounded">
          <option value="James Martinez">James Martinez</option>
          <option value="Anthony Clark">Anthony Clark</option>
          <option value="Chris White">Chris White</option>
          <option value="Sophia Johnson">Sophia Johnson</option>
          <option value="Noah Harris">Noah Harris</option>
          <option value="John Doe">John Doe</option>
        </select>
        </div>

      </div>
    </div>
    </div>

    </form>
  )
}

export default AddClassSchedule

