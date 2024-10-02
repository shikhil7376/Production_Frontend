import React from 'react'
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from '../Common/ListboxWrapper';
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { TfiVideoClapper } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import AddPost from './AddPost';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMessagesSquare } from "react-icons/lu";
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
interface sidebarProps {

    fetchData: () => Promise<void>;
    setSearchQuery: (query: string) => void; 
}


const Sidebar: React.FC<sidebarProps> = ({ fetchData, setSearchQuery  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const userdata = useSelector((state: RootState) => state.user.userdata);
    const [query,setQuery] = useState('')
    const navigate = useNavigate();


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setQuery(e.target.value);
        setSearchQuery(e.target.value); // Update the search query in the parent component
      };

    return (
        <div className=" h-full">
            <div className="h-full flex flex-col items-center bg-contentgray  rounded-lg shadow-lg ">
            <div className='flex justify-center pt-2'>
        
           <input className='bg-contentgray border-1 border-gray-500 rounded-full p-1  z-50 w-[80%] text-gray-500 text-sm'
           
            placeholder='search..'
            onChange={handleSearch}
            value={query}
            />
            </div>
                <ListboxWrapper >
                    <Listbox
                        aria-label="Actions"
                    >
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={() => navigate('/')}>
                            <div className="flex items-center">
                                <p className="font-semibold  font-roboto mr-2">Home</p>
                                <IoMdHome size={20} />
                            </div>
                        </ListboxItem>
                        
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={onOpen}>
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Post</p>
                                <PiSquaresFourBold size={20} />
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary">
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Reels</p>
                                <TfiVideoClapper size={20} />
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={() => navigate('/message')}>
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Message</p>
                                <LuMessagesSquare size={20} />
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={() => navigate(`/profile/${userdata?._id}`)} >
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Profile</p>
                                <FaUser size={20} />
                            </div>
                        </ListboxItem>

                    </Listbox>
                </ListboxWrapper>
            </div>
            <AddPost fetchData={fetchData} isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default Sidebar
