import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';
import { assets } from '../../assets/assets';
const Doctordashboard = () => {
  const{dToken,dashData,setdashData,getdashdata,currency,slotDateFormat,completeAppointment,cancelAppointment}=useContext(DoctorContext)
  useEffect(()=>{
    if(dToken)
    {
      getdashdata();
    }
  },[dToken])
  return dashData && (
    <div>
       <div className="flex flex-wrap gap-3">

<div className=" flex items-center gap-2 bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
  <img className="w-14" src={assets.earning_icon} alt="" />
  <div>
    <p className="text-xl font-semibold text-gray-600">{currency}{dashData.earnings}</p>
    <p className="text-gray-400">Earnings</p>
  </div>
</div>

<div className="flex items-center gap-2 bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
  <img className="w-14" src={assets.appointments_icon} alt="" />

  <div>
    <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
    <p className="text-gray-400">appointments</p>
  </div>
</div>

<div className='flex items-center gap-2 bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
  <img className="w-14" src={assets.patients_icon} alt="" />

  <div>
    <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
    <p className="text-gray-400">patients</p>
  </div>
</div>
</div>
{/* Latest Appointment */}
<div>
<div className="flex items-center gap-2.5 mt-10  px-4 py-4 rounded-t border">
<img src={assets.list_icon} alt = ""/>
<p className="font-semibold">Latest Appointments</p>
</div>

<div className="pt-4 border border-top-0">
  {
    dashData?.latestAppointments?.length > 0 ? (
    dashData.latestAppointments.map((item,index)=>(
<div className ='flex items-center gap-3 px-6 py-3 hover:bg-gray-100' key={index}>
<img className="rounded-full w-10" src={item.userData.image}/>
<div className="flex-1">
<p className="text-gray-800 font-medium">{item.userData.name}</p>
 <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p> 
</div>
{
      item.cancelled?
      <p className='text-red-400 text-xs font-medium'>Cancelled</p>
      :item.iscompleted?
      <p className='text-green-400 text-xs font-medium'>completed</p>
    :<div className='flex'>
      <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
      <img onClick = {()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
      </div>
}

</div>
    ))
  ):
  <p className="p-4 text-gray-500">No appointments found.</p>
  }
</div>
</div>

</div>
    
  );
}

export default Doctordashboard;
