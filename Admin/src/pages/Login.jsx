import { useContext, useState } from "react"
import { AdminContext } from "../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"
import { TrainerContext } from "../context/TrainerContext"


const Login = () => {
    const [state,setState] = useState("Admin")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {setAToken, backendUrl } = useContext(AdminContext)
    const { setTToken } = useContext(TrainerContext)

const onSubmitHandler = async(event)=> {
    event.preventDefault()
    try {
        if(state === "Admin") {
          const {data} = await axios.post(backendUrl + "/api/admin/login", {email,password})
          if(data.success){
            localStorage.setItem("aToken", data.token)
            setAToken(data.token)
            
          } else {
            toast.error(data.message)
          }
        }  else {
          const {data} = await axios.post(backendUrl + "/api/trainer/login", {email, password})
          if(data.success){
            localStorage.setItem("tToken", data.token)
            setTToken(data.token)
            } else{
              toast.error(data.message)
            }
        }
    } catch (error) {
      
         toast.error(error.message)
    }

}




  return (
    <div className=" h-screen flex items-center  justify-center   ">
    <form onSubmit={onSubmitHandler} className="flex flex-col min-w-[340px] sm:min-w-96 border rounded-xl  m-auto shadow-lg text-gray-600  text-sm">
    <div className="m-8">
    {state ==="Admin" ?  (
        <p className="m-auto text-2xl font-semibold text-center  "><span className="text-primary">Admin</span> Login</p>
        ): (
            <p className="m-auto text-2xl font-semibold text-center  "><span className="text-primary">Trainer</span> Login</p> 
        )
        } 
    
    <div className="w-full mt-1" >
        <p className="">Email</p>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border border-[#DADADA] outline-none mt-1 bg-slate-100"  type="email" required/>
    </div>
    <div className="w-full mt-1">
        <p>Password</p>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border border-[#DADADA] outline-none mt-1 bg-slate-100"  type="password" required/>
    </div>
    <button className="p-2 w-full bg-primary  text-white rounded-md mt-2.5" >Login</button>
    {
        state ==="Admin" ? (
            <p className="mt-2" onClick={()=>setState("Trainer")}>Trainer Login?<span className="text-primary cursor-pointer underline"> Click here</span></p>
        )  : (
            <p className="mt-2" onClick={()=>setState("Admin")}>Admin Login?<span className="text-primary cursor-pointer underline"> Click here</span></p>
        )
    }
    </div>
   
     
    </form>
    </div>
  )
}

export default Login