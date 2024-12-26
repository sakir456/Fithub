import { Dumbbell } from 'lucide-react';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { TrainerContext } from '../context/TrainerContext';
import {  useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {aToken, setAToken} = useContext(AdminContext)
  const {tToken, setTToken} = useContext(TrainerContext)
  const navigate = useNavigate()

const logout = ()=> {
    navigate("/")
     aToken && setAToken("")
     aToken && localStorage.removeItem("aToken")  
     tToken && setTToken("")
     tToken && localStorage.removeItem("tToken")
}

  return (
     <div className="flex justify-between items-center px-4 sm:px-10 py-4 bg-white border-b">
    <div className='flex items-center gap-2 text-2xl font-semibold '>
       <Dumbbell className='h-8 w-8 text-primary' />
      <span className='text-gray-800 '>FITHUB </span>
       <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs ">{aToken ? "Admin" : "Trainer"}</p>
       </div>
       <div>
        <button onClick={logout} className='bg-primary px-10 py-2 rounded-full text-white text-sm ' >Logout</button>
       </div>
      </div>
  )
}

export default Navbar