import React, { useContext, useEffect } from 'react';
import { Admincontext } from '../../context/Admincontext';

const DoctorList = () => {
  const{ doctors,getalldoctors,atoken,changeavailability}= useContext(Admincontext)

  useEffect(()=>{
if(atoken){
  getalldoctors()
}
  },[atoken])
  return (
    <div className=''>
    <h1 className='font-bold mt-5'>All Doctors</h1> 
    <div className=' w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {
      doctors.map((items,index)=>(
<div className='border border-indigo-200 max-w-56 rounded-xl cursor-pointer group' key={index}>
<img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src= {items.image}/>
<div className='p-4'>
  <p className='text-neutral-800 text-lg font-medium'>{items.name}</p>
  <p className='text-zinc-600 text-sm'>{items.speciality}</p>
  <div className='flex mt-2 items-center gap-1 text-sm'>
    {/* <input onChange={()=>changeavailability(items._id)} type="checkbox" checked={items.available}/> */}
    <input 
  type="checkbox" 
  onChange={()=>changeavailability(items._id)} 
  checked={items.available} 
/>

    <p>Available</p>
    </div>
  </div>
</div>
      ))
}
    </div>
    </div>
  );
}

export default DoctorList;
