import { useNavigate } from "react-router-dom"


const PageNotFound = () => {

    const navigate = useNavigate()
  return (
    <div className="h-screen bg-black text-primary font-teko text-4xl  flex flex-col justify-center items-center">    
        <h1>404 Page Not Found</h1>
        <button onClick={()=> navigate("/login")}>Login</button>
    </div>
  )
}

export default PageNotFound