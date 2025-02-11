import React, { useContext } from 'react';
import {assets} from '../assets/assets.js';
import { Admincontext } from '../context/Admincontext';
import { Navigate, useNavigate } from 'react-router';
import { DoctorContext } from '../context/Doctorcontext.jsx';
const Navbar = () => {
 const {atoken,setatoken} = useContext(Admincontext);
 const {dToken, setDToken} = useContext(DoctorContext)
 const navigate = useNavigate();
const Logout = ()=>{
  navigate('/')
atoken && setatoken('')
atoken && localStorage.removeItem('atoken')
dToken && setDToken('')
dToken && localStorage.removeItem('dToken')
}
  return (
    <div className='flex  justify-between bg-white items-center border-b py-2 px-4 sm:px-10'>
    <div className='flex items-center gap-2 cursor pointer'>
      <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo}/>
      <p className='border rounded-full px-2.5 py-0.4'>{atoken ? 'admin': 'Doctor'}</p>
    </div>
    <button  onClick={Logout}className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  );
}

export default Navbar;
