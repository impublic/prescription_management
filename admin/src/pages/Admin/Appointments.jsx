 import React, { useContext, useEffect } from 'react'
 import { Admincontext } from '../../context/Admincontext'
 import { Appcontext } from '../../context/Appcontext'
 import { assets } from '../../assets/assets'

 const Appointments = () => {
   const { appointments, getallappointment, atoken,cancelAppointment } = useContext(Admincontext)
   const { calculateAge,slotDateFormat,currency} = useContext(Appcontext)

   useEffect(() => {
     if (atoken) {
       console.log('Fetching appointments...')
       getallappointment()
     }
   },[atoken])

   return (
     <div className='w-full max-w-6xl m-5'>
       <p className='text-lg font-medium mb-3'>All Appointments</p>
       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
           <p>#</p>
           <p>Patient</p>
           <p>Age</p>
           <p>Date & Time</p>
           <p>Doctor</p>
           <p>Fees</p>
           <p>Action</p>
         </div>
         {appointments && appointments.length > 0 ? (
          [...appointments].reverse().map((item, index) => (
            <div
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
              key={index}
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 rounded-full'
                  src={item.userData.image || 'default-image-url'}
                  alt=''
                />
                <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 rounded-full bg-gray-200'
                  src={item.docData.image}
                  alt=''
                />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.iscompleted ? (
                <p className='text-green-400 text-xs font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-10 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='Cancel'
                />
              )}
            </div>
          ))
        ) : (
          <p className='p-6 text-center'>No appointments available</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;