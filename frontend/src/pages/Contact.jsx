import React from 'react'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
      <div className='text-center  pt-10 text-xl'>
        <p>CONTACT <span className=''>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row my-10 justify-center gap-10 text-sm mb-28'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image}/>
        <div className=' flex flex-col justify-center gap-6 items-start'>
          <p className='text-gray-600 font-semibold text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>00000 Willms Station<br/> Suite 000, Washington, USA</p>
          <p className='text-gray-500'> Tel: (000) 000-0000 <br/> Email: chainani.navin97@gmail.com</p>
          <p className=' text-lg text-gray-600 font-semibold'>CAREERS AT PRESCRIPTO</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black text-sm  px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
