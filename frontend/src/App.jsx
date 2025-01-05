import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
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
import PageNotFound from './pages/PageNotFound'
import {GoogleOAuthProvider} from '@react-oauth/google'
import ScrollToTop from './components/ScrollToTop';



function App() {
  
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='564922959685-mgmfvhpvhq48891vft5titsu4fsvp64e.apps.googleusercontent.com'>
        <Login></Login>
      </GoogleOAuthProvider>
    )
  }



  return (
    <div className=''>
    <ToastContainer/>
    <Navbar/>
    <ScrollToTop />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/schedule' element={<Schedule />} />
    <Route path='/all-trainers' element={<AllTrainers />} />
    <Route path='/workout-plans' element={<WorkoutPlans />} />
    <Route path='/about' element={<AboutUs />} />
    <Route path='/contact' element={<ContactUs />} />
    <Route path='/login' element={<GoogleAuthWrapper />} />
    <Route path='/my-profile' element={<MyProfile />} />
    <Route path='*' element={<PageNotFound />} />
   </Routes>
    
    </div>
  )
}

export default App
