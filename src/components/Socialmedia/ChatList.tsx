import React from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useState } from 'react';
import { getchatUser } from '../../Api/User';
import { createChat,fetchChat } from '../../Api/chat';
import { useEffect } from 'react';
import { IoIosNotifications } from "react-icons/io";
import errorHandle from '../../Api/Error';
import { userData,chat } from '../../Interface/DatatypeInterface';


const ChatList = ({ setActiveChat,notification,setNotification,onlineUsers, isOpen, toggleOpen  }) => {
     
    const userData = useSelector((state: RootState) => state.user.userdata);
    const [searchItem,setSearchItem] = useState<string>("")
    const [searchResult, setSearchResult] = useState<userData[]>([]);
    const [chats, setChats] = useState<chat[]>([]);
    const [showDropdown, setShowDropdown] = useState(false); 

    useEffect(() => {
        if (userData) {
          fetchUserChats();
        }
      }, [userData]);

    
    const fetchUserChats = async () => {
        if (!userData || !userData._id) {
          console.error("User data is not available.");
          return; 
        }
      
        try {
          const response = await fetchChat(userData._id as string); 
          if (response) {
            setChats(response.data.data); 
          }
        } catch (error) {
          errorHandle(error)
        }
      };
    
 
    function search(e:React.ChangeEvent<HTMLInputElement>){
        setSearchItem(e.target.value)
    }

    function getsender(currentUser, users){   
      return users[0]._id === currentUser._id? users[1].name:users[0].name
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         if(searchItem){
            try {
                const response = await getchatUser(userData?._id as string,searchItem)
                if(response){
                setSearchResult(response.data.data)
                }
            } catch (error) {
                errorHandle(error)
            }
         }
    }

    const accessChat = async(userId:string)=>{
     try {
        const response = await createChat(userData?._id as string,userId as string)            
        if(response){
          setSearchItem("")
          fetchUserChats()
        }      
     } catch (error) {
        errorHandle(error)
     }
      
    }

    const toggleDropdown = () => {   
        setShowDropdown(!showDropdown);
      };
    

     
    return (
      <div
      className={`bg-contentgray p-4 ml-3 rounded-lg h-[90vh] sm:w-[30%] transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-[-200%]'
      } fixed sm:relative sm:translate-x-0 sm:block z-50 sm:z-auto border-1 border-gray-500 `}
    >
            <div className='flex items-center gap-4'>
          <form onSubmit={handleSubmit}>
            <input
              className='bg-black border-1 text-sm  text-gray-400 rounded-full p-2'
              placeholder='Search'
              onChange={search}
              value={searchItem}
            />
          </form>
          <div className='relative'>
          {/* <IoIosNotifications color='gray' size={20} onClick={toggleDropdown} className="cursor-pointer" /> */}
          {/* <NotificationBadge count={notification.length} effect ={Effect.SCALE}/> */}
          {showDropdown && (
            <div className='absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-2 z-10'>
              {notification.length > 0 ? (
                notification.map((notif, index) => (
                    <div
                    key={index}
                    className="p-2  border-gray-300"
                    onClick={() => {
                      setActiveChat(notif.chat); 
                      setNotification(notification.filter((n) => n !== notif)); 
                    }}
                  >
                    <p className="text-sm font-semibold">
                       message from {getsender(userData, notif.chat.users)}
                    </p>
                  </div>
                  
                ))
              ) : (
                <p className='text-gray-500 text-sm'>No new messages</p>
              )}
            </div>
          )}
        </div>
          </div>
          <p className='text-gray-500 font-semibold p-2'>CHATS</p>
          
          {searchItem ? (
            searchResult.map((user) => (
              <UserList 
                key={user._id} 
                latestMessage=""
                user={user} 
                handlefunction={() => accessChat(user._id as string)} 
                onlineUsers={onlineUsers}
              />
            ))
          ) : (
            chats.map((chat) => {
              const otherUser = chat.users.find((u) => u._id !== userData?._id);              
              return (
                <UserList
                  key={chat._id} 
                  user={otherUser} 
                  latestMessage={chat.latestMessage}
                  handlefunction={() => setActiveChat(chat)} 
                  onlineUsers={onlineUsers}
                />
              );
            })
          )}
        </div>
      );
}

export default ChatList
