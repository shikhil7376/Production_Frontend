import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate()
  
  const returnBooking = ()=>{
    navigate('/bookings')
  }

  return (
    <div className='h-screen'>
    <div className=' flex justify-center'>
      <div className='w-[350px] h-[350px] bg-slate-200'style={{ backgroundImage: `url('/pics/sucess.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}> </div> 
    </div>
    <div className='flex justify-center'>
  <div className='flex flex-col items-center'>
    <h2 className='text-3xl font-semibold'>Thank You!</h2>
    <p className='text-base mt-2 font-semibold text-gray-400'>Your payment was successful. We appreciate your business!</p>
    <button  onClick={returnBooking} className='p-1 mt-4 text-white font-semibold bg-customPurple rounded-md border-3 border-purple-200' >View Booking</button>
  </div>
</div>
    </div>
  )
}

export default SuccessPage
