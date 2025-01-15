import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import SectionHeader from "./SectionHeader"


const Contact = () => {
  const {token, backendUrl} = useContext(AppContext)


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
    
  }

}

  return (
    <div className=" pt-10 pb-20 font-teko flex flex-col gap-2 items-center w-full text-indigo-950">
      <SectionHeader title="Get In Touch" textColor="text-primary" bgColor="bg-primary" />
    <p className=" flex flex-wrap md:text-4xl text-2xl sm:text-3xl font-semibold uppercase text-center mt-2 max-sm:mx-2">Contact Us to become Member </p>
    
     <form onSubmit={submitHandler} className=" flex flex-1  flex-col w-full max-w-3xl   mt-5  gap-7 font-barlow">
     <div className="flex gap-3 w-full">
    <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary"/>
    <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary"/>
   </div>
   <div className="w-full">
    <input type="text" placeholder="Enter Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary"/>
   </div>
   <div className="w-full">
    <textarea type="text" placeholder="Enter Message" value={message} onChange={(e)=>setMessage(e.target.value)} className="px-3 py-3 border  w-full text-sm outline-none focus:border-primary" rows={8}/>
   </div>
   <div className="w-full flex items-start">
    <button className="py-4 px-10  text-primary border border-primary font-teko tracking-widest hover:bg-primary hover:text-white transition-all">Submit</button>
   </div>
     </form>
      
    </div>
  )
}

export default Contact