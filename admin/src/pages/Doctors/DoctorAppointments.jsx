import React, { useEffect,useContext } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';
import { assets } from '../../assets/assets';
const DoctorAppointments = () => {
  const{dToken,appointments,getappointments,calculateAge,slotDateFormat,currency,completeAppointment,cancelAppointment}=useContext(DoctorContext)

  useEffect(()=>{
if(dToken){
  getappointments()
}
  },[dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p  className='mb-3 text-lg font-medium'>All appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className=' max-sm:hidden flex flex-wrap justify-between max-sm:gap-1 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
          <p>#</p>
          <p>patient</p>
          <p>payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
        appointments.reverse().map((item,index)=>(
<div className='flex flex-wrap justify-between  max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg--gray-50'>
  <p className='max-sm:hidden'>{index+1}</p>
  <div className='flex items-center gap-2'>
    <img className='w-8 rounded-full' src={item.userData.image} alt=""/><p>{item.userData.name}</p>
    </div>
    <div>
{
  <p className='text-xs border inline border-primary px-2 rounded-full'>{item.payment ?'Online':'CASH'}</p>
}
</div>
    <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
    <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
    <p>{currency}{item.amount}</p>
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
        }
      </div>
    </div>
  );
}

export default DoctorAppointments;
