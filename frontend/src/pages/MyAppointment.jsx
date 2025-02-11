import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const{token,backend_url }= useContext(AppContext)
  const [appointments,setappointments]=useState([])
   const navigate = useNavigate()
const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const slotDateFormat = (slotDate)=>{
  const dateArray = slotDate.split('_')
  return dateArray[0] + " " + months[Number(dateArray[1])] + " " +dateArray[2]
}

  const getUserAppointments = async()=>{
    try {
const { data } = await axios.get(backend_url + '/api/user/appointments',{headers:{token}})
 setappointments(data.appointments.reverse());
 console.log(data.appointments)
}catch(error){
toast.error(error.message)
    }
  }
  // cancel appointment 
  const cancelappointment= async(appointmentId) =>{
    try{
// console.log(appointmentId)
const {data} =await axios.post(backend_url + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
console.log(data)
if(data.success){
  toast.success(data.message)
  getUserAppointments()
} else {
  toast.error(data.message)
}
    }catch(error){
      toast.error(error.message)
    }

  };

//   // payment 

const initpay = (order)=>{

  const options = {
key:import.meta.env.RAZORPAY_KEY_ID,
amount: order.amount,
currency: order.currency,
name: 'Appointment payment',
order_id:order.id,
receipt:order.receipt,
handler: async(response)=>{
console.log(response)
// verify the payment
try {
  const {data}= await axios.post(backend_url + '/api/user/verify-razorpay',response,{headers:{token}})
  if(data.success){
    getUserAppointments()
    navigate('/my-appointment')
  }
}catch(error){
 console.log(error)
 toast.error(error.message)
}
}
}
// verify the payment Frontend

const rzp = new window.Razorpay(options);
rzp.open();
};
  const appointmentRazorpay= async(appointmentId)=>{
try{
const { data } = await axios.post(backend_url + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})
if(data.success){
  console.log(data.order)
  initpay(data.order)
}
}catch(error){

}
  }
  useEffect(()=>{
if(token){
  getUserAppointments();
 
}
  },[token])
  return (
    <div>
      <p className='  pb-3  mt-12 text-xl text-zinc-700 font-medium border-b'>My appointments</p>
      <div>
{appointments.map((item,index)=>(
<div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
  <div>
    <img className='w-32 bg-indigo-50' src={item.docData.image}/>
    </div>
    <div className=' flex-1 text-zinc-600 text-sm'>
      <p className=' text-neutral-800 font-semibold'>{item.docData.name}</p>
      <p>{item.docData.speciality}</p>
      <p className='mt-1 font-medium text-zinc-700'>Address</p>
      <p className='text-xs'>{item.docData.address.line1}</p>
      <p className='text-xs'>{item.docData.address.line2}</p>
      <p className='text-xs mt-1'><span className=' text-neutral-700 font-medium text-sm '>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
      </div>
      <div></div>
      <div className='flex flex-col gap-2 justify-end'>
        {/* !item.cancelled means if our appointment is not cancelled */}
        {!item.cancelled && item.payment && !item.iscompleted && <button className='sm:min-w-48 border rounded text-stone-500 bg-indigo'>paid</button>}
        {!item.cancelled && !item.payment &&  !item.iscompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:max-w-48 py-2  hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
         {!item.cancelled && !item.iscompleted && <button onClick={()=>cancelappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
        {item.cancelled &&  !item.iscompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
        {item.iscompleted && <button className='sm:min-w-48 py-2 border border-green-500 text-green-500 rounded'>completed</button>}
        </div>
      
  </div>
))}
      </div>
    </div>
  );
}

export default MyAppointment;