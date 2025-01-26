import { useContext } from "react"
import plans from "../data/PlansData"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"


const Plans = () => {
  const {backendUrl, token} = useContext(AppContext)


  const initPay = (order)=> {
     const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:"Gym Membership Payment",
      description:"Gym Membership Payment",
      order_id: order.id,
      receipt: order.receipt,
      notes:order.notes,
      handler: async (response)=> {
        console.log(response)

        try {
          const  {data} = await axios.post(backendUrl + "/api/user/verify-razorpay",  response,{headers:{token}})
          if(data.success){
            toast.success(data.message)
          }
        } catch (error) {
          console.log(error);
            toast.error(error.message)
        }
     }

  }
  const rzp = new window.Razorpay(options)
     rzp.open()
}



 const paymentRazorPay = async(planType)=>  {

  try {
      const {data}  = await axios.post(backendUrl + "/api/user/payment-razorpay", {planType}, {headers: {token}})
      if(data.success){
        initPay(data.order)
      }
  } catch (error) {
    console.log(error);
      toast.error(error.message)
  }

 }


  return (
    <div className="px-6 pt-10 pb-20 font-teko flex flex-col gap-2 items-center w-full text-indigo-950">
    <SectionHeader title="Plans" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap lg:text-5xl sm:text-4xl text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Choose a Perfect Plan For You </p>
     <div className="flex justify-center items-center flex-wrap gap-8 mt-5 ">
            {
              plans.map((item,index)=> (
                <div className="   flex  flex-col  gap-2 p-5  justify-center  border shadow-lg  bg-white font-barlow " key={index}>
                   <p className="font-bold text-2xl">{item.planType}</p>
                   <p className="font-bold text-3xl text-primary flex  items-end" >${item.amount}<p className="text-base font-normal text-indigo-950 ">/month</p></p>
                  <p className="font-barlow mt-4  ">{item.description}</p>
                  <p className=" font-semibold text-lg mt-2">Features:</p>
                  <div className="flex flex-col gap-2">
                    {
                        item.features.map((item, index)=> (
                            <p key={index} className="flex gap-2  "><p className=" text-primary">✓</p>{item}</p>
                        ))
                    }
                  </div>

                  <button className=" relative bg-primary  text-white py-2 mt-4 rounded font-medium overflow-hidden   group " onClick={()=> paymentRazorPay(item.planType)}>
                  <span className="relative z-10">choose {item.planType} </span>
                  <div className="absolute inset-0 bg-primary-hover transform scale-x-0 
              origin-left transition-transform duration-500 ease-linear group-hover:scale-x-100 text-white"></div>
                  </button>

                 
                </div>
              ))
            }
          </div>  

    </div>
  )
}

export default Plans