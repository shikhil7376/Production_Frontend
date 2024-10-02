import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import ContentCard from '../Common/content/ContentCard';
import { useState } from 'react';
import { getPosts ,userNotFollow} from '../../Api/User';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { FaEdit } from "react-icons/fa";
import EditPost from './EditPost';
import { deletePost } from '../../Api/User';
import { toast } from 'react-toastify';

type Card = {
  _id:string;
  comments:number;
  createdAt:string;
  descriptipn:string;
  image:string[];
  likes:number
  };

const ViewPost = ({ isOpen, onClose, card,userId ,setSelectedCard,setPostData }: { isOpen: boolean; onClose: () => void; card: any,userId:string, setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>,setPostData  }) => {
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [toggleEdit,setToggleEdit] = useState(false);
    const userData = useSelector((state: RootState) => state.user.userdata);

    
     
    const fetchNotFollowData = async () => {
        const response = await userNotFollow(userData?._id as string);
        if (response) {
          setData(response.data);
        }
      };
 
      const fetchData = async () => {
        const response = await getPosts();
        if (response) {
          setPosts(response.data.data);
        }
      };

      const editRender = ()=>{
        setToggleEdit(!toggleEdit)
      }

      const handleDelete = async()=>{
        const response = await deletePost(card.id);
        if (response) {
          toast.success(response.data.message);
         setPostData((prev)=>prev.filter((item)=>item.id !== card.id))
          onClose()
        }  
      }
    
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} className=''>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
          </ModalHeader>
          <ModalBody className=' flex items-center p-5'>
            {
              !toggleEdit?(
                <>
               <ContentCard key={card.id} post={card} fetchData={fetchData} fetchNotFollowData={fetchNotFollowData} />
                </>
              ):(
                <>
              <EditPost post={card} setSelectedCard ={setSelectedCard} setPostData={setPostData} onClose={onClose} />
                </>
              )
            }
          </ModalBody>
          {!toggleEdit && userData?._id ==userId &&( 
               <ModalFooter className=' flex justify-between'>
               <button className='justify-start' onClick={editRender}><FaEdit /></button>
               <div>
               <Button color="danger" variant="light" onPress={onClose}>
                 Close
               </Button>
               <Button color="primary" onPress={handleDelete}>
                 Delete Post
               </Button>
               </div>
             </ModalFooter>
          )}  
        </>
      </ModalContent>
    </Modal>
  );
};

export default ViewPost;
