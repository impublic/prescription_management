 import React, { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'
 import { assets } from '../assets/assets'
 import {NavLink} from 'react-router-dom'
import { DoctorContext } from '../context/Doctorcontext'
 const SideBar = () => {
     const {atoken}= useContext(Admincontext)
     const{dToken}=useContext(DoctorContext)
   return (
     <div className='  bg-white border-r'>
       {
      atoken && <ul className='text-[#515151] mt-5'>
 <NavLink className={({ isActive }) => 
     `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
      to = {'/admin-dashboard'}>
     <img src={assets.home_icon}/>
     <p  className='hidden md:block'>Dashboard</p>
 </NavLink>

 <NavLink className={({ isActive }) => 
     `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}   to = {'/all-appointment'}>
     <img src={assets.appointment_icon}/>
     <p  className='hidden md:block'>Appointments</p>
 </NavLink>

 <NavLink className={({ isActive }) => 
     `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}   to = {'/adddoctors'}>
     <img src={assets.add_icon}/>
     <p  className='hidden md:block'>Add Doctor</p>
 </NavLink>

 <NavLink className={({ isActive }) => 
     `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}   to = {'/doctor-list'}>
     <img src={assets.people_icon}/>
     <p>Doctors List</p>
 </NavLink>

      </ul>
 }{
    dToken && <ul className='text-[#515151] mt-5'>
    <NavLink className={({ isActive }) => 
        `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
         to = {'/doctor-dashboard'}>
        <img src={assets.home_icon}/>
        <p className='hidden md:block'>Dashboard</p>
    </NavLink>
   
    <NavLink className={({ isActive }) => 
        `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}   to = {'/doctor-appointments'}>
        <img src={assets.appointment_icon}/>
        <p className='hidden md:block'>Appointments</p>
    </NavLink>
   
    
   
    <NavLink className={({ isActive }) => 
        `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}   to = {'/doctor-profile'}>
        <img src={assets.people_icon}/>
        <p  className='hidden md:block'>profile</p>
    </NavLink>
   
         </ul>}
    </div>
       
  )
 }

 export default SideBar
