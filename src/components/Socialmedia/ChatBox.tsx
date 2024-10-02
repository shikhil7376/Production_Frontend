import React from 'react'
import { getMessages, sendMessage } from '../../Api/chat';
import { useState, useEffect, useCallback } from 'react';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react';
import { FaPlay, FaPlus } from "react-icons/fa";
import { add, format } from 'date-fns';
import { AudioRecorder } from 'react-audio-voice-recorder';
import ReactLoading from 'react-loading';
import { Avatar } from "@nextui-org/react";
import { userData } from '../../Interface/DatatypeInterface';
import { CiVideoOn } from "react-icons/ci";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { Input } from "../../components/ui/input";
import { MdDelete } from "react-icons/md";
import { deleteMessage } from '../../Api/chat';


interface Message {
  _id:string;
  id: string;
  content: string;
  image: string;
  sender: {
    _id: string
  };
  createdAt: Date,
  timestamp: string;
  type?: 'text' | 'audio'
}

const ENDPOINT = "http://localhost:8000"

var socket, selectedChatCompare

const ChatBox = ({ activeChat, notification, setNotification, onlineUsers, setOnlineUsers }) => {


  const userData = useSelector((state: RootState) => state.user.userdata);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use onOpen to open and onClose to close the modal
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [value, setValue] = useState("")
  

  // const [onlineUsers, setOnlineUsers] = useState<string[]>([]);


  // Object.values(onlineUsers).map((user,index)=>{
  //   console.log('user',user);

  // })

 

  let getusername = ''
  let getuserimage = ''
  if (activeChat) {
    if (activeChat.users[0]._id == userData?._id) {
      getusername = activeChat.users[1].name
      getuserimage = activeChat.users[1].image
    } else {
      getusername = activeChat.users[0].name
      getuserimage = activeChat.users[0].image
    }
  }

  const isUserOnline = (userId) => onlineUsers.includes(userId);


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", userData)
    socket.on("connection", () => setSocketConnected(true))
    socket.on("userOnline", (users) => {
      const userIds = Object.values(users) as string[]; 
      setOnlineUsers(userIds);
    });

   

    return () => {
      socket.disconnect();
    };

  }, [])

  //  useEffect(()=>{
  //   socket.on('videoCallNotification',(data)=>{
  //     console.log('lala',data);

  //   })
  // },)

  useEffect(() => {
    if (activeChat) {
      fetchMessages();
      selectedChatCompare = activeChat
    }
  }, [activeChat]);

  useEffect(() => {
    socket.on("messagerecieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          // setNotification([newMessageRecieved, ...notification])
          // fetchMessages()
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    }) 
  })


  useEffect(() => {
    socket.on("videoCallNotify", (roomId, fromUserName) => {
      setNotification([{ roomId, fromUserName }])
      console.log(roomId, fromUserName);
    }) 
  })

  const fetchMessages = async () => {
    try {
      const response = await getMessages(activeChat._id);
      setMessages(response?.data);
      socket.emit('joinchat', activeChat._id)
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const navigate = useNavigate()
  function openModal() {
    onOpen();  // Explicitly open the modal
    const roomId = generateRoomId()
    setValue(roomId)
  }

  function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
  }


  const handleJoinRoom = useCallback(() => {
    if (activeChat) {
      const oppositeUser = activeChat.users.find(user => user._id !== userData?._id);
      if (oppositeUser) {
        socket.emit('videocallInitiated', {
          roomId: value,
          fromUser: userData?._id,
          fromUserName: userData?.name,
          toUser: oppositeUser._id,
          chatId: activeChat._id
        });
        navigate(`/room/${value}`)
      }

    }

  }, [navigate, value])

  const handleSendMessage = async () => {
    // e.preventDefault();
    if (newMessage.trim() || selectedImage || selectedVideo || selectedAudio && activeChat) {
      try {
        const formData = new FormData()
        setLoading(true);
        if (userData) {
          // const response = await sendMessage(userData?._id, newMessage, activeChat._id);                
          // socket.emit('newmessage',response?.data.data)
          // setMessages([...messages,response?.data.data])
          // // fetchMessages()
          // setNewMessage(''); 
          if (selectedImage) {
            formData.append('file', selectedImage)
            formData.append('type', 'image')
          } else if (selectedVideo) {
            formData.append('file', selectedVideo)
            formData.append('type', 'video')
          } else if (newMessage) {
            formData.append('content', newMessage)
          } else if (selectedAudio) {
            formData.append('file', selectedAudio);
            formData.append('type', 'audio');
          }
          formData.append('senderId', userData._id)

          formData.append('chatId', activeChat._id)

          const response = await sendMessage(formData)
            console.log('reponst',response);
            
          if (response) {
            setLoading(false)
            socket.emit('newmessage', response?.data)
            setMessages([...messages, response?.data])
            setNewMessage('')
            setSelectedImage(null);
            setSelectedVideo(null);
            setSelectedAudio(null);
          }
        }
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (emojiData && emojiData.emoji) {
      setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
    }
    setShowEmojiPicker(false)
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileType = file.type
      if (fileType.startsWith('image/')) {
        setSelectedImage(file)
      } else if (fileType.startsWith('video/')) {
        setSelectedVideo(file)
      } else {
        console.log('Unsupported file type');
      }

    }
  }

  let chatUser: userData | null = null;
  if (activeChat) {
    chatUser = activeChat.users.find((u) => u._id !== userData?._id);
  }

  const deleteMessages = async(msg)=>{    
   const response = await deleteMessage(msg._id)
   if(response){
    socket.emit("deleteMessage",{
      messageId:msg._id,
      activeChat:activeChat.users
    })
   }
  }
 
  useEffect(()=>{
    socket.on("messageDeleted",(deletemsgId)=>{      
      setMessages((prevmsg)=>prevmsg.filter(msg=>msg._id!==deletemsgId)
      )
    })
  })

  const renderMessageContent = (message) => {
    if (message.image) {
      return <img src={message.image} alt="image" className="w-40 h-40"  />;
    } else if (message.video) {
      return <video src={message.video} controls className="w-40 h-40" />;
    } else if (message.audio) {
      return <audio src={message.audio} controls className='w-full' />
    } else {
      return  <span >{message.content}</span>;
    }
  };

  const addAudioElement = (audioBlob) => {
    const audioFile = new File([audioBlob], 'audioMessage.mp3', { type: 'audio/mp3' });
    setSelectedAudio(audioFile);
  };

  
  return (
    <div className='bg-contentgray ml-3 rounded-lg h-[90vh] w-full mr-2 border-1 border-gray-500'>
      {activeChat ? (
        <div className=''>
          <div className='flex justify-center p-1 gap-2 items-center'>
            <Avatar isBordered radius="full" size="md" src={getuserimage} />
            {chatUser && isUserOnline(chatUser?._id) ? (
              <span className="online-indicator "></span>
            ) : (
              <span className="offline-indicator"></span>
            )}              <div>

            </div>
            <h2 className='text-gray-500 font-semibold' >{getusername}</h2>
            <div className=' absolute right-10'>
              <CiVideoOn color='white' size={20} onClick={openModal} />
            </div>
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
                            // onChange={(e)=>setValue(e.target.value)}
                            required
                          />
                        </div>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onClose}> {/* Close the modal using onClose */}
                            Close
                          </Button>
                          <Button className="bg-black text-white font-semibold text-small" onClick={handleJoinRoom} type="submit">
                            START VIDEO CALL
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>

          </div>
          <div className='h-[74vh] overflow-y-auto scrollbar-hide p-2'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-2 ${message.sender?._id === userData?._id ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div 
                  className={`p-2 rounded-md ${message?.sender._id === userData?._id
                      ? 'bg-gray-500 text-white max-w-[70%] text-right  '
                      : 'bg-gray-600 text-white max-w-[70%] text-left'
                    }`}
                >
                  {renderMessageContent(message)}
                  
                  <span className="text-xs text-gray-300 ml-2">
                    {format(new Date(message.createdAt), 'h:mm')}
                  </span>
                  {message.sender._id === userData?._id && (<button onClick={()=>deleteMessages(message)}><MdDelete /></button>   )}
                </div>
              </div>
            ))}

       

            {selectedImage && (
              <div className=' p-2 flex justify-end rounded-lg items-center gap-2'>
                {loading && (<ReactLoading type='spin' color="green" height={20} width={20} />)}
                <img src={URL.createObjectURL(selectedImage)} alt='Selected' className='h-40 w-40' />
              </div>
            )}
            {selectedVideo && (
              <div className=' p-2 flex justify-end rounded-lg items-center gap-2'>
                {loading && (<ReactLoading type='spin' color="green" height={20} width={20} className='' />)}
                <video src={URL.createObjectURL(selectedVideo)} controls className='h-40 w-40 ' />
              </div>
            )}
            {selectedAudio && (
              <div className=' p-2 flex justify-end rounded-lg items-center gap-2'>
                {loading && (<ReactLoading type='spin' color="green" height={20} width={20} className='' />)}
                <audio src={URL.createObjectURL(selectedAudio)} controls />
              </div>
            )}
          </div>


          <div className='fixed mt-6 md:mt-0 md:w-[700px] ml-2 rounded-lg '>
            <div className='flex gap-1 md:gap-2 items-center'>
              <button
                type='button'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className='ml-2 text-white'
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className='absolute bottom-[80px]'>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <FaPlus color='gray' size={18} onClick={() => document.getElementById('fileInput')?.click()} />
              <input id='fileInput' type='file' style={{ display: 'none' }} onChange={handleFileChange} />
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className='w-full  rounded bg-gray-700 text-white'
                placeholder='Type a message...'
              />
              <button><FaPlay size={20} color='gray' onClick={handleSendMessage} /></button>
              <div className=''>
                <AudioRecorder onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                  }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center p-2 text-gray-500 font-semibold'>Select a chat to start messaging</p>
      )}
    </div>
  )
}

export default ChatBox
