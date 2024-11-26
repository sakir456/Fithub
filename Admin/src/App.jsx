import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import TrainersList from './pages/Admin/TrainersList';
import MembersList from './pages/Admin/MembersList';
import AddMemberAndTrainer from './pages/Admin/AddMemberAndTrainer';
import AddClassSchedule from './pages/Admin/AddClassSchedule';


function App() {
  const {aToken} = useContext(AdminContext)
  
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      {/* admin-routes */}
      <Routes>
        <Route path='/' element= {<></>} />
        <Route path='/admin-dashboard' element= {<><Dashboard/></>} />
        <Route path='/trainers' element= {<><TrainersList/></>} />
        <Route path='/members' element= {<><MembersList/></>} />
        <Route path='/addmemberandtrainer' element= {<><AddMemberAndTrainer/></>} />
        <Route path='/class-schedule' element= {<><AddClassSchedule/></>} />
      </Routes>
    </div>
    </div>
    
  ) :  (
    <div className='w-screen h-screen'>
    <ToastContainer/>
    <Login/>
   </div>
  )
}

export default App
