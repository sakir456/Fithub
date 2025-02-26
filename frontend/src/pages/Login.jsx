import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../api'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import axios from "axios"
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import PageLoader from '../components/PageLoader'

const Login = () => {

  const {backendUrl,token,setToken, } = useContext(AppContext)

  const navigate = useNavigate();
  const [state, setState] =useState("Sign Up")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  
const onSubmitHandler = async(event)=> {
    event.preventDefault();

     setLoading(true)
     try {
      if (state === "Sign Up"){
        const {data} = await axios.post(backendUrl + "/api/user/register", {name,password,email})
        if(data.success){
          localStorage.setItem("token", data.token)
          setToken(data.token)
        } else{
          toast.error(data.message)
        }

      } else {
          const {data} = await axios.post(backendUrl + "/api/user/signin", {email,password}) 
          if(data.success){
            localStorage.setItem("token", data.token)
            setToken(data.token)
          } else{
            toast.error(data.message)
          }
      }
     } catch (error) {
        toast.error(error.message)
     }finally{
      setLoading(false)
  }

  }


  const responseGoogle = async(authResult) => {

    setLoading(true)
       try {
    if(authResult['code']){
         const result = await googleAuth(authResult['code'])  
        const token = result.data.token
        localStorage.setItem('token', token)
        setToken(token)
        navigate('/')
       }
         } catch (error) {
         console.log('Error while requesting google code :   ' ,error)
     }finally{
      setLoading(false)
  }
  }

  const googleLogin = useGoogleLogin({

        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
  })



  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    loading ? (
      <PageLoader />
    ) : (
    <div className="">
        <div>
        <div className="   w-full h-28 bg-[url('https://res.cloudinary.com/dkmnkggev/image/upload/v1740476246/hero2_mhw5ji.webp')] flex justify-center items-center ">
        </div>
    <div className=" py-10 flex justify-center  ">
      <form onSubmit={onSubmitHandler} className=' flex flex-col gap-3 items-start p-8 m-4  w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      
      <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Sign in"}</p>
      
      {
        state === "Sign Up" &&  <div className="w-full">
           <p>Full Name</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="border border-zinc-300 rounded w-full p-2 mt-1" type="text"  />
      </div>
        
      }
      <div className="w-full">
        <p>Email</p>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-zinc-300 rounded w-full p-2 mt-1" type="email"  />
      </div>
      <div className="w-full">
        <p>Password</p>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-zinc-300 rounded w-full p-2 mt-1" type="password"  />
      </div>
      <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">{state === "Sign Up" ? "Create Account" : "Login"}</button>
      {
        state ==="Sign Up" ?
        <p>Already have an account?<span  onClick={()=> setState("Login")} className="text-primary underline cursor-pointer">Sign in here</span>  </p> :
        <p>Create a new account ?<span onClick={()=> setState("Sign Up")} className="text-primary underline cursor-pointer">click here</span> </p>

      }
      <div className='w-full flex justify-center mt-1'>
      <p className=''>OR</p>
      </div>
      
      <div className="w-full flex justify-center mt-1">
              <div className="w-full flex justify-center">
                <div className="flex justify-center items-center w-full max-w-xs">
                  <GoogleButton
                    onClick={googleLogin}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>
            </div>
      </form>
    </div>
        </div>
    </div>
  )
)
}

export default Login



