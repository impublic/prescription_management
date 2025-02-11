import React, { createContext, useState } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'
export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const currency = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState('');
    const[appointments,setappointments]=useState([])
    const[dashData,setdashData]=useState(false)
    const[profileData,setprofileData]=useState(false)
    // api to get appointment in doctor Login sidebar
    const getappointments=async()=>{
        try{
const{data}=  await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
console.log(data)
if(data.success){
    setappointments(data.appointments)
    console.log(data.appointments)
}else{
    toast.error(data.message)
}
}catch(error){

toast.error(data.message)
        }
    }
    // api to calculte age
    const calculateAge = (dob) => {
        const currency = '$'
        const today = new Date();
        const birthdate = new Date(dob);
        let age = today.getFullYear() - birthdate.getFullYear();
        return age;
      };
      const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const slotDateFormat = (slotDate)=>{
    const dataArray = slotDate.split('_')
   return  dataArray[0]+" " + months[Number(dataArray[1])] +" " + dataArray[2]
}


// api to make complete Appointment 
const completeAppointment=async(appointmentId)=>{
    try{
const{data}=await axios.post(backendUrl +'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
if(data.success){
    toast.success(data.message)
    getappointments()
}else{
    toast.error(data.message)
}
}catch(error){
    toast.error(error.message)
    }
    }

// api to make cancel Appointment 
const cancelAppointment=async(appointmentId)=>{
    try{
const{data}=await axios.post(backendUrl +'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
if(data.success){
    toast.success(data.message)
    getappointments()
}else{
    toast.error(data.message)
}
}catch(error){
    toast.error(error.message)
    }
    }
    // api to get dashboard data for dashboard panel
    const getdashdata = async()=>{
        try{
            const{data}=await axios.get(backendUrl +'/api/doctor/dashboard',{headers:{dToken}})
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
// api to get profile data for doctor panel
const getProfileData = async () => {
    try{
    const {data}= await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
    if(data.success){
        setprofileData(data.profileData)
        console.log(data.profileData)
    }
}catch(error){
    toast.error(error.message)
}
}
   
    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,setappointments,getappointments,
        calculateAge,slotDateFormat,currency,completeAppointment,cancelAppointment,
        dashData,setdashData,getdashdata,
        profileData,setprofileData,getProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
