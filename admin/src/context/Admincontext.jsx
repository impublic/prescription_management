import React, { createContext, useState } from 'react';
    import axios from 'axios'
import {toast} from 'react-toastify'
// import { cancelAppointment } from '../../../Backend/controller/userController';
 export const Admincontext = createContext()
  const AdmincontextProvider  = ({ children }) => {
    const[atoken,setatoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const[doctors,setdoctors]=useState([])
    const[appointments,setappointments]=useState([])
    const[dashData,setdashData]=useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL
      const getalldoctors = async ()=>{
        try{
           const{data}= await axios.post( backend_url + '/api/admin/all-doctors', {} ,{headers:{atoken}})
         
console.log(data)
    if(data.success){
      setdoctors(data.doctors)
      console.log(data.doctors)
    } else {
      toast.error(data.message)
    }
        }catch(error){
toast.error(error.message)
        }
      }
      // availability property
      const changeavailability = async(docId)=>{
        try{
        const { data } = await axios.post(backend_url + '/api/admin/change-availability',{docId},{headers:{atoken}});
        if(data.success){
          toast.success(data.message)
          console.log(data.message)
          getalldoctors()
        }else{
          toast.error(data.message)
        }
        }catch(error){
          toast.error(error.message)
        }
      }
      // get appointment
      const getallappointment= async()=>{
try {
const {data}=await axios.get(backend_url + '/api/admin/appointments',{headers:{atoken}})
console.log('API Response:', data); 
if (data.success) {
  setappointments(data.appointments); // Set appointments if data is available
  console.log('Appointments:', data.appointments);
} else {
  toast.error(data.message)
}
} catch (error) {
// Handle any errors during the request

toast.error(error.message); // Display error message from server or generic error
}
};

// Api to cancel appointment
const cancelAppointment = async(appointmentId)=>{
  try{
const{data}=await axios.post(backend_url + '/api/admin/cancel-appointments',{appointmentId},{headers:{atoken}})
if(data.success){
toast.success(data.message)
getallappointment() //update get the latest appointment
}else{
  toast.error(data.message)
}
}catch(error){
  toast.error(error.message)
}
}
// get Dashboard
const getDashData = async()=>{
  console.log(getDashData)
try{
const {data}= await axios.get(backend_url + '/api/admin/dashBoard',{headers:{atoken}})
console.log(data)
if(data.success){
 setdashData(data.dashData)
  console.log(data.dashData)
}else{
  toast.error(data.message)
}

}catch(error){
toast.error(error.message)
}
}



      const value = {
      atoken,setatoken,
      backend_url,doctors,
      getalldoctors,changeavailability,
      appointments,setappointments,getallappointment,
      cancelAppointment,dashData,getDashData


      }
      return (
        <Admincontext.Provider value={value}>
          {children}
       </Admincontext.Provider>
      );
    };
    
    export default AdmincontextProvider
    
    // change-availability
