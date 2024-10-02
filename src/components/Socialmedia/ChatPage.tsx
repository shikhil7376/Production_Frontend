import React from 'react'
import Header from './Header'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import { useState } from 'react'
import { IoAppsOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


const ChatPage = () => {

    const [activeChat, setActiveChat] = useState(null); 
    const [notification,setNotification] = useState([])
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const navigate = useNavigate()
  return (
    <div className=' bg-black h-screen'>
      <Header notification ={notification} setNotification={setNotification} setActiveChat={setActiveChat}/>
      <div className='fixed z-50 bottom-0 p-1 w-full md:hidden'>
        <div className='flex items-center justify-between  rounded-md p-2'> 
          <IoMdHome size={20} className='text-gray-500' onClick={()=>navigate('/adoption')} />
          <IoSearchOutline size={20} className='text-gray-500' />
          <PiSquaresFourBold size={20} className='text-gray-500'/>
          < LuMessagesSquare size={20} className='text-gray-500'  onClick={()=>navigate('/message')}/>
          <FaUser size={20} className='text-gray-500'/>
        </div>
      </div>
      <div className='flex justify '>
      <button 
                className="sm:hidden absolute top-1 left-4 z-20 bg-gray-400 p-2 rounded"
                onClick={() => setIsChatListOpen(!isChatListOpen)}
            >
                < IoAppsOutline/>
            </button>
        <ChatList setActiveChat={setActiveChat} notification ={notification} setNotification={setNotification} onlineUsers={onlineUsers} isOpen={isChatListOpen}  toggleOpen={() => setIsChatListOpen(!isChatListOpen)} />
      
      <ChatBox activeChat={activeChat} notification ={notification} setNotification={setNotification}  onlineUsers={onlineUsers}  setOnlineUsers={setOnlineUsers}  />
      </div>
    </div>
  )
}

export default ChatPage
