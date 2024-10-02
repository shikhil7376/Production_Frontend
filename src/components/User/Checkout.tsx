import React from 'react'
import { useParams } from 'react-router-dom'
import { viewDetails } from '../../Api/Kennel'
import { booking } from '../../Api/Kennel'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../Redux/Store';
import errorHandle from '../../Api/Error';
import { loadStripe } from '@stripe/stripe-js';
import { CageData } from '../../Interface/DatatypeInterface';
import { CiCalendarDate } from "react-icons/ci";
import { IoAppsOutline } from "react-icons/io5";



const Booking = () => {
  const { cageid, fromdate, todate } = useParams<{ cageid: string, fromdate: string, todate: string }>();
  const [details, setDetails] = useState<CageData>({});
  const userData = useSelector((state: RootState) => state.user.userdata)

  const calculateTotalDays = () => {
    if (!fromdate || !todate || !moment(fromdate, 'DD-MM-YYYY').isValid() || !moment(todate, 'DD-MM-YYYY').isValid()) {
      console.error('Invalid or missing from/to dates. Setting total days to 0.');
      return 0;
    }

    const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
    const toDateMoment = moment(todate, 'DD-MM-YYYY');
    const daysDiff = toDateMoment.diff(fromDateMoment, 'days', true);
    return Math.max(daysDiff + 1, 0);
  };

  const [totalDays, setTotalDays] = useState(calculateTotalDays());
  const totalAmount = totalDays * (details.pricepernight || 0);


  useEffect(() => {
    fetchViewDetails();
  }, []);


  const fetchViewDetails = async () => {
    if (cageid) {
      try {
        const response = await viewDetails(cageid);
        setDetails(response?.data.message);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
  };



  async function makePayment() {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)
    const bookingDetails = {
      details,
      userid: userData?._id,
      email: userData?.email,
      fromdate,
      todate,
      totalAmount,
      totalDays,

    }
    try {

      const response = await booking(bookingDetails)
      const sessionId = response?.data

      await stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      errorHandle(error)
    }

  }

  return (
    <div className='p-5'>
      <div className='p-2'>
        <button className=' bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white rounded-md font-semibold flex items-center gap-1 text-small'><IoAppsOutline />
          CHECKOUT</button>
      </div>
      <div className='flex flex-col sm:flex-row p-2'>

        <div className='sm:w-3/5  flex flex-col items-center gap-10'>
          <div className='p-2 border-1  sm:w-[70%]'>
            <p className='text-small font-semibold  text-gray-500'>"Need anything else? Our team is here to help!"</p>
            <p className='text-small font-semibold  text-gray-500'>"Your perfect getaway awaits. Relax, unwind, and enjoy your stay!" </p>
          </div>
          <div>
            <p className='text-small text-gray-500 font-roboto flex items-center gap-1' >check in:<CiCalendarDate size={20} />{fromdate}</p>
            <p className='text-small text-gray-500 font-roboto flex items-center gap-1' >check out:<CiCalendarDate size={20} />{todate}</p>
          </div>
          <div>
            <h2 className='text-sm font-semibold'>KENNEL DETAILS</h2>
            <div className='border-t border-gray-300 mt-2'></div> {/* This is the line */}
            <p className='text-small text-gray-500 font-roboto flex items-center p-1 gap-x-2' >Kennel name:<span>{details?.kennelname}</span></p>
            <p className='text-small text-gray-500 font-roboto flex items-center p-1 gap-x-2' >location:<span>{details?.location?.address}</span></p>
            <p className='text-small text-gray-500 font-roboto flex items-center p-1 gap-x-2 '> contact: <span>{details?.phone}</span></p>
          </div>
        </div>
        <div className='w-full sm:w-2/5 flex justify-center '>
          <div className='w-full sm:w-[70%] bg-lightwhite flex flex-col items-center  border-1'>
            <div className='w-full h-[200px]'>
              {details.image && details.image[0] && (
                <img src={details.image[0]} alt="Kennel Image 1" className='w-full h-full object-cover ' />
              )}
            </div>
            <h2 className='text-sm font-semibold p-2 '>BOOKING DETAILS</h2>

            <p className='text-sm text-gray-500 font-roboto  flex items-center p-1 gap-x-2' >Max Count:<span>{details.maxcount}</span></p>
            <p className='text-sm text-gray-500 font-roboto  flex items-center p-1 gap-x-2' >Total Days:<span>{totalDays}</span></p>
            <p className='text-sm text-gray-500 font-roboto  flex items-center p-1 gap-x-2' >Price Per Day:<span>${details.pricepernight}</span></p>
            <p className='text-sm text-gray-500 font-roboto  flex items-center p-1 gap-x-2' >Total Price:<span>${totalAmount}</span></p>
            <div className='p-2'>
              <button className=' p-1 bg-customPurple text-white rounded-md text-small font-semibold' onClick={makePayment}>PROCEED TO PAY</button>

            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Booking
