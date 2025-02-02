import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import SectionHeader from "./SectionHeader"
import LoadingSpinner from "./LoadingSpinner"


const Contact = () => {
  const {token, backendUrl} = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()


const submitHandler = async(e)=> {
  e.preventDefault()
  if(!token){
    toast.warn("Login to Contact Admin")
    navigate("/login")
  }
  setLoading(true)
  try {
    const {data} = await axios.post(backendUrl + "/api/user/savequery", {name, email, subject, message}, {headers: {token}})
    if(data.success){
      toast.success(data.message)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
     } else {
      toast.error(data.message)
     }
  } catch (error) {
     toast.error(error.message)
     console.log(error)
    
  }finally{
    setLoading(false)
  }

}

  return (
    <div className=" px-6 pt-10 pb-20 font-teko flex flex-col gap-2 items-center w-full text-indigo-950">
      <SectionHeader title="Get In Touch" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap lg:text-5xl sm:text-4xl text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Contact Us to became a Member </p>
    
     <form onSubmit={submitHandler} className=" flex flex-1  flex-col w-full max-w-4xl border shadow-lg p-5 py-10  mt-5  gap-7 font-barlow">
     <div className="flex md:flex-row flex-col md:gap-5 gap-7 w-full">
     <div className="flex flex-col gap-1.5  w-full text-sm">
     <span className="font-medium"> Name</span>
    <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary"/>
    </div>
    <div className="flex flex-col gap-1.5  w-full text-sm">
     <span className="font-medium">Email</span>
    <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none  focus:border-primary"/>
   </div>
   </div>
   <div className="flex flex-col gap-1.5  w-full text-sm">
     <span className="font-medium">Subject</span>
    <input type="text" placeholder="Enter Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary"/>
   </div>
   <div className="flex flex-col gap-1.5  w-full text-sm">
     <span className="font-medium">Message</span>
    <textarea type="text" placeholder="Enter Message" value={message} onChange={(e)=>setMessage(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary" rows={8}/>
   </div>
   <div className="w-full flex items-start">
   {
    loading ? (
      <LoadingSpinner text="Submitting..."/>
    ) : (
      <button className="py-4 px-10  text-primary border border-primary font-teko tracking-widest hover:bg-primary hover:text-white transition-all">Submit</button>
    )
   }
    
   </div>
     </form>
      
    </div>
  )
}

export default Contact