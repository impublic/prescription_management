import React, { useContext, useEffect,useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate, useParams } from 'react-router';
import { assets } from '../assets/assets';
import Relateddoctors from '../components/Relateddoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
  
const{ docId }= useParams()
const navigate = useNavigate();
  const{ doctors,currencysymbol,token,backend_url,getAllDoctors }= useContext(AppContext)
const daysOfWeeks = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const[docInfo,setdocInfo]=useState(null);
  const[docslots,setdocslots]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const[slotTime,setSlotTime]=useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc =>doc._id ===  docId)
    setdocInfo(docInfo);
    console.log(docInfo);
  }

  const getAvailableSlots = async ()=>{
    if (!docInfo) {
      return; // Exit the function if docInfo is null
    }
setdocslots([]);
  

  // getting current date
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    // getting date with index
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
  
// setting end  time of the date with index
let endTime = new Date()
endTime.setDate(today.getDate() + i);
endTime.setHours(21, 0, 0, 0);
// setting hours

if (today.getDate() === currentDate.getDate()) {
  currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
  currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
} else {
  currentDate.setHours(10);
  currentDate.setMinutes(0);
}

let timeSlots = [];
while (currentDate < endTime) {
  let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });



const day= currentDate.getDay()
const month = currentDate.getMonth()+1
const year = currentDate.getFullYear()

const slotDate = day + "_" + month +"_" + year 
const slotTime = formattedTime
// delete appointment after Book
const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

// const isSlotAvailable = !(docInfo.slots_booked?.[slotDate]?.includes(slotTime));
      if (isSlotAvailable) {
        // add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })
        
      }
      
  // Increment time by 30 mins
  currentDate.setMinutes(currentDate.getMinutes() + 30);
}
setdocslots(prev =>([...prev,timeSlots]))
  }
}
// Book Appointment
const bookappointment = async ()=>{
  if(!token){
    toast.warn('Login to book appointment')
    return navigate('/login')
  }
  try{
const date = docslots[slotIndex][0].dateTime
let day = date.getDate()
let month  = date.getMonth()+1
let year = date.getFullYear()

const slotDate = day + "_" + month +"_" + year 
console.log(slotDate);
const { data } = await axios.post(backend_url + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
if(data.success){
  toast.success(data.message)
  getAllDoctors()
  navigate('/my-appointment')
} else {
  toast.error(data.message)
}
  } catch(error){
    toast.error(error.message)
    console.log(error)
  }
}
  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

useEffect(()=>{
console.log(docslots);
},[docslots])
  // if (!docInfo) {
  //   return <p>Loading doctor information...</p>; // Displayed until docInfo is available
  // }
  return docInfo && (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary sm:max-w-72 rounded-lg' src= {docInfo.image}alt=""/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}<img className='w-5' src={assets.verified_icon}/></p>
          <div className='flex items-center text-gray-500 mt-1 text-sm gap-2'>
          <p>{docInfo.degree} - { docInfo.speciality} </p>
          <button className=' p-0.5 px-2  text-xs border rounded-full'>{docInfo.experience}</button>
          </div>
          {/* About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon}/></p>
          <p className='text-sm text-gray-500  max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'> 
            Appointment Fees :<span className='text-gray-600'> {currencysymbol}{docInfo.fees}</span></p>
        </div>
      </div>
{/* Booking slots */}
<div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
  <p>Booking slots</p>
  <div className='flex gap-3 items-center w-full  overflow-x-scroll mt-4'>
    {
      docslots.length && docslots.map((item,index)=>(
    <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ?'bg-primary text-white':'border border-gray-200'}`} key= {index}>
      <p>{item[0] && daysOfWeeks[item[0].dateTime.getDay()]}</p>
      <p>{item[0] && item[0].dateTime.getDate()}</p>
      </div>
      ))
    }
  </div>
  <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
    {
      docslots.length && docslots[slotIndex].map((item,index)=>(
        <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`}key={index}>
          {item.time.toLowerCase()}
        </p>


      ))
    }
  </div>
  <button onClick = {bookappointment} className='bg-primary font-light text-white px-14 py-3 rounded-full my-6'>Book an appointment</button>
</div>
{/* listing Related Doctors */}
<Relateddoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;

  
 
  