import React from 'react'
import { viewDetails } from '../../Api/Kennel'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CageData } from '../../Interface/DatatypeInterface';
import { FaPhone } from "react-icons/fa6";
import { FaDog } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import errorHandle from '../../Api/Error';
import LeafletMap from './LeafletMap';

const ViewDetails = () => {
    const { cageid, fromdate, todate } = useParams<{ cageid: string; fromdate: string; todate: string }>();
    const [details, setDetails] = useState<CageData>({});
    const navigate = useNavigate()
    const fetchViewDetails = async () => {
        if (cageid) {
            try {
                const response = await viewDetails(cageid);
                setDetails(response?.data.message);
            } catch (error) {
               errorHandle(error)
            }
        }
    };

    const handleButtonClick = () => {
        if (!fromdate || !todate || fromdate === 'undefined' || todate === 'undefined') {
            navigate('/get-kennels');
        } else {
            navigate(`/booking/${cageid}/${fromdate}/${todate}`)
        }
    };

    useEffect(() => {
        fetchViewDetails();
    }, [cageid]);
    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row pl-1 gap-2'>
                <div className='image1 w-[308px] sm:w-[400px] sm:h-[412px] pl-2  overflow-hidden'>
                    {details.image && details.image[0] && (
                        <img src={details.image[0]} alt="Kennel Image 1" className='w-full h-full object-cover' />
                    )}
                </div>
                <div className='multipleimage  flex flex-col justify-between pl-2 gap-2'>
                    <div className='image2 w-[300px] sm:h-[200px]  overflow-hidden'>
                        {details.image && details.image[1] && (
                            <img src={details.image[1]} alt="Kennel Image 2" className='w-full h-full object-cover' />
                        )}
                    </div>
                    <div className='image3 w-[300px] sm:h-[200px]  r overflow-hidden'>
                        {details.image && details.image[2] && (
                            <img src={details.image[2]} alt="Kennel Image 3" className='w-full h-full object-cover' />
                        )}
                    </div>
                </div>
                
                {details.location && (
                    <LeafletMap latitude={details.location.lat} longitude={details.location.lng} />
                )}
                
            </div> 


            <div className=' flex flex-col sm:flex-row justify-between p-5'>
                <div className='w-full sm:w-[50%]'>
                    <h2 className='font-semibold'>Description:</h2>
                    <p className='text-gray-500 text-small'>{details.description}</p>
                    <h2 className='font-semibold'>Location:</h2>
                    <p className='text-gray-500 text-small'>{details.location?.address}</p>
                    <div className="p-2 flex flex-col sm:flex-row gap-1 justify-between">
                        <div className="flex items-center p-1 drop-shadow-2xl rounded-md bg-gray-400">
                            <h2 className="font-semibold text-white flex items-center gap-1">
                                contact: <FaPhone />
                            </h2>
                            <p className="text-white text-small ml-2">{details.phone}</p>
                        </div>
                        <div className="flex items-center p-1 drop-shadow-2xl rounded-md bg-gray-400">
                            <h2 className="font-semibold text-white flex items-center gap-1">
                                maxcount: <FaDog />
                            </h2>
                            <p className="text-white text-small ml-2">{details.maxcount}</p>
                        </div>
                        <div className="flex items-center p-1 drop-shadow-2xl rounded-md bg-gray-400">
                            <h2 className="font-semibold text-white flex items-center gap-1">
                                type:<IoMdHome />
                            </h2>
                            <p className="text-white text-small ml-2">{details.type}</p>
                        </div>
                    </div>
                </div>
                <div className=' p-5 border-1 bg-white rounded-2xl  drop-shadow-xl'>
                    <h2 className=' font-semibold text-center '>Price:${details.pricepernight}/per night</h2>
                    <div className='p-2'>
                    <p className='text-small text-gray-500 font-semibold flex items-center gap-1'>check in:  <CiCalendarDate size={20} /> {fromdate && fromdate !== 'undefined' ? fromdate : ''}</p>
                    <p className='text-small text-gray-500 font-semibold flex items-center gap-1' >check out:<CiCalendarDate size={20} /> {todate && todate !== 'undefined' ? todate : ''}</p>
                    </div>
                    <div className=' flex  justify-center items-center p-5'>
                        <button onClick={handleButtonClick} className=' bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-small font-semibold text-white rounded-md'>    {(!fromdate || !todate || fromdate === 'undefined' || todate === 'undefined') ? 'choose dates' : 'BOOK NOW'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewDetails
