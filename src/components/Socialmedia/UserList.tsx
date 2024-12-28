import React from 'react'
import { Avatar} from "@nextui-org/react";


const UserList = ({user,handlefunction,onlineUsers,latestMessage}) => {    
  const date = new Date(latestMessage.updatedAt);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  hours = hours % 12 || 12; 
  const formattedTime = `${hours}:${minutes}`;
    
  return (
    <div className='display flex p-2 items-center' onClick={handlefunction} >
      <div className='flex gap-1'>
      <Avatar isBordered radius="full" size="md" src={user.image} />
      { onlineUsers.includes(user._id) ? (
          <span className="online-indicator "></span>
        ) : (
          <span className="offline-indicator"></span>
        )} 
      </div>
      <div className='pl-2 w-full'>
        <div className='flex justify-between'>
        <p className=' text-gray-400 text-sm '>{user.name}</p>
        <p className=' text-gray-400 text-xs '>{formattedTime}</p>
        </div>
       <p className='text-sm text-gray-500'>{latestMessage ? latestMessage.content : "No recent messages"}</p> 
        </div>
    </div>
  )
}

export default UserList
