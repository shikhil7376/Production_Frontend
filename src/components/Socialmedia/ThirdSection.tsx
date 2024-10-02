import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import { UserNotFollow } from '../../Interface/DatatypeInterface';
import { follow } from '../../Api/User';
import errorHandle from '../../Api/Error';


interface ThirdSectionProps {
    fetchNotFollowData: (userId: string) => void;
    data: UserNotFollow[]; 
  }

const ThirdSection: React.FC<ThirdSectionProps>  = ({ fetchNotFollowData, data }) => {
    const userData = useSelector((state: RootState) => state.user.userdata);

    const handleFollow = async(userId:string)=>{
      try {
      const response = await follow(userData?._id as string,userId)
        if(response){
            fetchNotFollowData(userData?._id as string)
        }
      } catch (error) {
        errorHandle(error)
      }
    }

    useEffect(() => {
        if (userData?._id) {
          fetchNotFollowData(userData._id);
        }
      }, [userData?._id]);
 
    return (
        <div className="p-5 w-full md:w-2/5 hidden md:block">
            <div className="bg-contentgray rounded-lg h-full w-full shadow-md p-5 ">
                <div className="flex flex-wrap gap-4"> {/* Flexbox container for cards */}
                    {data.map((user) => (
                        <div key={user._id} className='flex-1 min-w-[130px] max-w-[130px] flex flex-col items-center p-3 rounded-2xl bg-blur border border-gray-500 shadow-xl'>
                            <Image
                                isBlurred
                                width={60}
                                height={60}
                                src={user.image || "pics/signin.jpg"} // Use user's image or fallback
                                alt="User"
                                className="rounded-full"
                            />
                            <p className='text-white text-sm font-roboto'>{user.name}</p>
                            <div className='p-3'>
                                <button className='text-white p-1 text-sm bg-button-gradient font-semibold rounded-md' onClick={() => handleFollow(user._id)}>
                                    Follow
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThirdSection;
