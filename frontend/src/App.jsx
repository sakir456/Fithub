import './App.css'
import {ToastContainer} from "react-toastify"
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import AllTrainers from './pages/AllTrainers'
import WorkoutPlans from './pages/WorkoutPlans'
import MyProfile from './pages/MyProfile'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

function App() {
  

  return (
    <div className='w-screen h-screen'>
    <ToastContainer/>
    <Navbar/>
  
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/schedule' element={<Schedule />} />
    <Route path='/all-trainers' element={<AllTrainers />} />
    <Route path='/workout-plans' element={<WorkoutPlans />} />
    <Route path='/about' element={<AboutUs />} />
    <Route path='/contact' element={<ContactUs />} />
    <Route path='/login' element={<Login />} />
    <Route path='/my-profile' element={<MyProfile />} />
   </Routes>
    
    </div>
  )
}

export default App
