import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Admincontext } from '../../context/Admincontext';
import { toast } from "react-toastify";
import axios from 'axios'
const Adddoctors =  () => {

  const[docimg,setdocimg]=useState(false);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[experience,setExperience]=useState('1 year');
  const[fees,setFees]=useState('');
  const[speciality,setSpeciality]=useState('General physician');
  const[degree,setDegree]=useState('');
  const[address1,setAddress1]=useState('');
  const[address2,setaddress2]=useState('');
  const[about,setAbout]=useState('');
 const{backend_url,atoken}= useContext(Admincontext)
  const onsubmitHandler = async (event)=>{
event.preventDefault();
  
try{
  if(!docimg)
  {
     return toast.error('image Not selected')
  }
  const formdata = new FormData()
  formdata.append('image',docimg)
  formdata.append('name',name)
  formdata.append('email',email)
  formdata.append('password',password)
  formdata.append('speciality',speciality)
  formdata.append('experience',experience)
  formdata.append('fees',Number(fees))
  formdata.append('about',about)
  formdata.append('degree',degree)
  formdata.append('address',JSON.stringify({line1:address1,line2:address2}))
  // console.log form
  formdata.forEach((key,value)=>{
    console.log(`${key}: ${value}`);
  })
  const { data } = await axios.post(backend_url + '/api/admin/add-doctor',formdata,{headers:{ atoken } })
  if(data.success){
    toast.success(data.message)
    setdocimg(false)
    setName('')
    setPassword('')
    setEmail('')
    setAddress1('')
    setaddress2('')
    setDegree('')
    setAbout('')
    setFees('')

  } else {
    toast.error(data.message)
  }
}catch(error){
toast.error(error.message)
}
}
  return (

   <form onSubmit={onsubmitHandler} className='m-5 w-full'>
     
    <p className=' mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>
        <label htmlFor="doc-img">
<img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimg? URL.createObjectURL(docimg):assets.upload_area}/>
</label>
<input onChange={(e)=>setdocimg(e.target.files[0])} type="file" id="doc-img" hidden/>
<p>Upload doctor <br/>
picture</p>
</div>

<div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

<div className='w-full  lg:flex-1 flex  flex-col gap-4'>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Your name</p>
    <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type= "text" placeholder='Name' required/>
  </div>

  <div  className='flex-1 flex flex-col gap-1'>
    <p>Doctor Email</p>
    <input  onChange={(e)=>setEmail(e.target.value)} value = {email} className='border rounded px-3 py-2' type= "email" placeholder='Email' required/>
  </div>

  <div  className='flex-1 flex flex-col gap-1'>
    <p>Set Password</p>
    <input  onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type= "password" placeholder='password' required/>
  </div>

  <div  className='flex-1 flex flex-col gap-1'>
    <p>Experience</p>
    <select  onChange={(e)=>setExperience(e.target.value)} value = {experience} className='border rounded px-3 py-2'>
      <option value = "1 year">1 year</option>
      <option value = "2 year">2 year</option>
      <option value = "3 year">3 year</option>
      <option value = "4 year">4 year</option>
      <option value = "5 year">5 year</option>
      <option value = "6 year">6 year</option>
      <option value = "7 year">7 year</option>
      <option value = "8 year">8 year</option>
    </select>
  </div>

  <div  className='flex-1 flex flex-col gap-1'>
    <p>Fees</p>
    <input  onChange={(e)=>setFees(e.target.value)} value = {fees} type= "number" placeholder='fees' required/>
  </div>

</div>

  <div className='w-full lg:flex-1 flex flex-col gap-4'>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>speciality</p>
      <select  onChange={(e)=>setSpeciality(e.target.value)} value = {speciality} className='border rounded px-3 py-2' name='speciality'>
        <option value="General physician">General physician</option>
        <option value="Gynecologist">Gynecologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Pediatricians">Pediatricians</option>
        <option value="Neurologist ">Neurologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
    </div>
   
  
{/* Education Field */}
  <div className='flex-1 flex flex-col gap-1'>
    <p>Education</p>
    <input  onChange={(e)=>setDegree(e.target.value)} value = {degree} type= "text" placeholder='Education' required/>
  </div>
{/* Education Field end */}

  <div className='flex-1 flex flex-col gap-1'>
    <p>Address</p>
    <input  onChange={(e)=>setAddress1(e.target.value)} value = {address1} className='border rounded px-3 py-2' type= "text" placeholder='address 1' required/>
    <input  onChange={(e)=>setaddress2(e.target.value)} value = {address2} className='border rounded px-3 py-2'type= "text" placeholder='address 2' required/>
  </div>
</div>
</div>

  <div>
    <p className='mt-4 mb-2'>About Doctor</p>
    <textarea  onChange={(e)=>setAbout(e.target.value)} value = {about} className='w-full px-4 pt-2 border rounded'  placeholder="write about doctor" rows={5} required/>
  </div>
  
  <button type='submit' className='bg-primary px-10 py-3 rounded-full mt-4 text-white'>Add Doctor</button>
</div>


     
      </form>
      
   
  );
}

export default Adddoctors;
