import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { getBookings } from '../../Api/Kennel';
import { Card, CardBody, Image } from "@nextui-org/react";
import { CiCalendarDate } from "react-icons/ci";
import { cancelBooking } from '../../Api/Kennel';
import { Booking } from '../../Interface/DatatypeInterface';
import errorHandle from '../../Api/Error';
import { toast } from 'react-toastify';
import { setCredential } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

const Bookings = () => {
  const userData = useSelector((state: RootState) => state.user.userdata)
  const [cageData, setCageData] = useState<Booking[]>([])
  const dispatch = useDispatch();



  const bookings = async () => {
    try {
      if (userData?._id) {
        const response = await getBookings(userData._id);
        setCageData(response?.data.data)
      }

    } catch (error) {
       errorHandle(error)
    }
  }

  const parseDate = (dateString: string): Date => {
    return new Date(dateString.split('-').reverse().join('-'));
  };

  async function CancelBooking(bookingid: string, roomid: string) {
    try {
      const result = await cancelBooking(bookingid, roomid);
      if(result){  
        dispatch(setCredential(result.data.data))
        toast.success("Booking Cancelled")
        bookings()
      }
    } catch (error) {
      errorHandle(error)
    }
  }

  


  useEffect(() => {
    bookings()
  }, [])

  return (
    <div className='h-screen overflow-y-auto scrollbar-hide'>
      <div className='p-2  ml-10'>
        <h1 className='font-semibold text-sm font-roboto'>MY BOOKINGS</h1>
      </div>
      <div className='flex flex-col gap-y-4 p-5 '>
    
      {cageData.map((data, index) => (

        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] "
          shadow="sm"
        >
            <CardBody key={index}>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center  rounded-lg">
                <div className="relative col-span-6 md:col-span-4 ">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src={data.cageImage}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 ">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className=" text-sm text-gray-500 text-foreground/90 font-roboto">{data.kennelname}</h3>
                      <div className='display flex items-center'>
                        <p className="text-small text-gray-500 text-foreground/80 font-roboto">checkIn:</p>
                        <CiCalendarDate />
                        <p className="text-small text-gray-500 text-foreground/80 font-roboto">{data.fromdate}</p>
                      </div>
                      <div className='display flex items-center'>
                        <p className="text-small text-gray-500 text-foreground/80 font-roboto">checkout:</p>
                        <CiCalendarDate />
                        <p className="text-small text-gray-500 text-foreground/80 font-roboto">{data.todate}</p>
                      </div>
                      <div className='display flex items-center justify-between'>
                        <p className="text-sm text-gray-500  text-foreground/80 font-roboto">{data.totaldays}Days</p>|
                        <p className="text-sm  text-gray-500  text-foreground/80 font-roboto">Totalprice:${data.totalamount}</p>
                      </div>
                      <p className="text-small  text-gray-500 font-roboto">
                        Status: <span 
                        className="text-xs font-semibold font-roboto"
                          style={{ color: data.status === 'booked' ? 'green' : 'red' }}
                        >
                          {data.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}
                        </span>
                      </p>

                    </div>
                  </div>
                  <div className='display flex justify-end mr-5'>
                  {(data.status === 'booked') && 
                  (parseDate(data.fromdate) > new Date()) &&
                  (
                    <button
                      className='text-xs border- rounded-sm p-1 font-semibold bg-red-600 text-white'
                      onClick={() => CancelBooking(data._id, data.cageid)}
                    >
                      CANCEL BOOKING
                    </button>
                  )
                }
                   </div>
                </div>
              </div>
            </CardBody>
        
        </Card>
      ))}
      </div>
    </div>
  )
}

export default Bookings
