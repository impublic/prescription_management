import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Admincontext } from "../context/Admincontext";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../context/Doctorcontext";
const Login = () => {
    const[state,setstate]=useState('Admin')
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const{ setatoken,backend_url }= useContext(Admincontext)
    const{setDToken,backendUrl} = useContext(DoctorContext)

    const onSubmitHandler = async (event) =>{
      event.preventDefault()

      try{
        
        if(state === 'Admin'){
          const {data}= await axios.post(backend_url + '/api/admin/login',{email,password});
          if(data.success){
            localStorage.setItem('atoken',data.token)
            setatoken(data.token);
            console.log(data.token);
          }else{
        toast.error(data.message)
}
} else {
const{data}= await axios.post(backendUrl + '/api/doctor/logins',{email,password})
if(data.success){
  localStorage.setItem('Dtoken',data.token)
  setDToken(data.token);
}else{
  toast.error(data.message)
}
}
    } catch (error) {

    }
  }
  return (
    <form onSubmit={onSubmitHandler}className="min-h-80 flex items-center">
<div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E]text-sm shadow-lg">
<p className="text-2xl font-semibold m-auto"><span className="text-primary"> { state }</span>Login</p>
<div className="w-full">
    <p className="w-full">Email:</p>
    <input onChange = {(e)=>setemail(e.target.value)} value = {email} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="email" required/>
    </div>

    <div className="w-full">
    <p>password:</p>
        <input onChange= {(e)=>setpassword(e.target.value)} value = {password}  className='border border-[#DADADA] rounded w-full p-2 mt-1'  type = "password" required />
  </div>
  <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
  {
    state === 'Admin'
    ?<p>Doctor Login ? <span onClick = {()=>setstate('Doctor')} className=" text-primary cursor-pointer underline">Click here</span></p>
    :<p>Admin Login ? <span onClick={()=>setstate('Admin')} className=" text-primary cursor-pointer underline">Click here</span></p>
  }
</div>
</form>
  ) 
};

export default Login;
