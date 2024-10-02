import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "../../components/ui/input";
import { useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';


const Header = ({notification,setNotification,setActiveChat}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use onOpen to open and onClose to close the modal
  const [value,setValue] = useState("")
  const [showDropdown, setShowDropdown] = useState(false); 
  const userData = useSelector((state: RootState) => state.user.userdata);

  const navigate = useNavigate()
  function openModal() {
    onOpen();  // Explicitly open the modal
  }

  const handleJoinRoom = useCallback(()=>{
      navigate(`/room/${value}`)
  },[navigate,value])

  const handleNotificationClick = (notif) => {
    navigate(`/room/${notif.roomId}`)
  }
 

  const toggleDropdown = () => {   
    setShowDropdown(!showDropdown);
  };

  function getsender(currentUser, users){   
    return users[0]._id === currentUser._id? users[1].name:users[0].name
  }

  return (
    <div className='p-3 flex justify-end'>
      <div className='relative'>
   <IoIosNotifications color='gray' size={20} onClick={toggleDropdown} className="cursor-pointer" />
   {showDropdown && (
            <div className='absolute right-0 mt-6 w-64 bg-white rounded-md shadow-lg p-2 z-10'>
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
                    <p className="text-sm font-semibold" onClick={() => handleNotificationClick(notif)}>
                       {/* message from {getsender(userData, notif.chat.users)} */}
                       video call from {notif.fromUserName}
                    </p>
                  </div>
                  
                ))
              ) : (
                <p className='text-gray-500 text-sm'>No new messages</p>
              )}
            </div>
          )}
          </div>
      {/* <CiVideoOn color='white' size={20} onClick={openModal} /> */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onClose}  // Modal uses onOpenChange to handle closing
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">VIDEO CALL</ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      placeholder="Enter Room Code"
                      value={value}
                      onChange={(e)=>setValue(e.target.value)}
                      required
                    />
                  </div>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}> {/* Close the modal using onClose */}
                      Close
                    </Button>
                    <Button className="bg-black text-white font-semibold text-small" onClick={handleJoinRoom} type="submit">
                      JOIN
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Header;
