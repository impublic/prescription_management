import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  import { Admincontext } from './context/Admincontext';
import Navbar from './component/Navbar';
import SideBar from './component/SideBar';
import { Route, Routes } from 'react-router';
import DashBoard from './pages/Admin/DashBoard';
 import Appointments from './pages/Admin/Appointments';
 import Adddoctors from './pages/Admin/Adddoctors';
 import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/Doctorcontext';
import Doctordashboard from './pages/Doctors/Doctordashboard';
import DoctorAppointments from './pages/Doctors/DoctorAppointments';
import DoctorProfile from './pages/Doctors/DoctorProfile';
const App = () => {
  const{atoken}=useContext(Admincontext)
  const{dToken}= useContext(DoctorContext)
  return atoken ||dToken? (
    <div className='bg-[#F8F9FD]'>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <SideBar/>
          <Routes>
            {/* Admin Routes */}
            <Route path = "/" element={<></>}/>
             <Route path='/admin-dashboard' element= {<DashBoard/>} /> 
            <Route path = '/all-appointment' element = {<Appointments/>}/> 
            <Route path= '/adddoctors' element = {<Adddoctors/>}/>
             <Route path= '/doctor-list' element = {<DoctorList/>}></Route>
              {/*Doctor Route  */}
              <Route path= '/doctor-dashboard' element = {<Doctordashboard/>}></Route>
              <Route path= '/doctor-appointments' element = {<DoctorAppointments/>}></Route>
              <Route path= '/doctor-profile' element = {<DoctorProfile/>}></Route>
              </Routes>
        </div>
    </div>
  ):(
    <>
    <Login/>
      <ToastContainer/>
     
      </>
)
}

export default App;
