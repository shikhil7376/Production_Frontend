import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { FaRegComment } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { commentPost } from '../../Api/User';
import errorHandle from '../../Api/Error';
import { toast } from 'react-toastify';
import { getAllComments } from '../../Api/User';
import '../../components/Socialmedia/comment.css'

interface Comment {
  user: {
    image: string;
    name: string;
  };
  text: string;
}

const AddComment = ({ postId }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);  // State to store comments

  const userData = useSelector((state: RootState) => state.user.userdata);

  const onEmojiClick = (emojiData) => {
    if (emojiData && emojiData.emoji) {
      setComment(comment + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (isOpen) {
      getComments(); 
    }
  }, [isOpen]);

  const getComments = async () => {
    try {
      const response = await getAllComments(postId);
      if (response) {
        setComments(response.data);
        setComment(''); // Reset comment input field
      }
    } catch (error) {
      errorHandle(error);
    }
  }

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const response = await commentPost(postId, userData?._id as string, comment);
      if (response) {
        toast.success(response.data);
        getComments(); // Fetch the latest comments after posting
        setComment(''); // Clear the input field after posting
      }
    } catch (error) {
      errorHandle(error);
    }
  };

  return (
    <>
      <FaRegComment 
        onClick={onOpen} 
        className="text-customPurple cursor-pointer text-xl"
      />
  
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent className="h-screen bg-black flex flex-col">
          <ModalHeader className="flex flex-col gap-1 text-default-400">Add Comment</ModalHeader>
          <ModalBody className="flex-1 flex flex-col-reverse p-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hidden">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <img src={comment.user.image} alt={comment.user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-default-400">@{comment.user.name}</span>
                      <p className="text-sm text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex items-center gap-2 fixed bottom-0 left-0 p-4">
              <div className="w-full max-w-md mx-auto bg-black rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <input 
                    className="shadow appearance-none border rounded-lg w-full text-default-400 p-2 leading-tight focus:outline-none focus:shadow-outline text-small bg-black/30 placeholder-text-default-400" 
                    placeholder="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{ marginLeft: '10px' }}
                  >
                    😊
                  </button>
                  <MdFileUpload 
                    className='text-default-400 cursor-pointer' 
                    size={30} 
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddComment;
