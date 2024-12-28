import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from 'react';
import { getFollowers,getFollowing } from '../../Api/User';
import errorHandle from '../../Api/Error';
import { Avatar} from "@nextui-org/react";
import { userData } from '../../Interface/DatatypeInterface';

const FollowersList = ({isOpen, onClose,modalType,id}) => {
const [followersData,setFollowersData] = useState<userData[]>([])
const [followingData,setFollowigData] = useState<userData[]>([])


    const fetchFollowersData = async()=>{
        try {
            const response = await getFollowers(id)
            if(response){
                setFollowersData(response.data.data)
            }
        } catch (error) {
            errorHandle(error)
        }
    }

    const fetchFollowingData = async()=>{
        try {
            const response = await getFollowing(id)
            if(response){
                setFollowigData(response.data.data)
            }
        } catch (error) {
            errorHandle(error)

        }
    }

    useEffect(() => {
        if (modalType === 'followers') {
          fetchFollowersData();
        }
        if (modalType === 'following') {
            fetchFollowingData();
          }
      }, [modalType]);
   
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} className=''>
    <ModalContent className=' h-[500px] overflow-auto scrollbar-hide'>
      <>
        <ModalHeader className="flex flex-col gap-1">
        {modalType === 'followers' ? 'Followers List' : 'Following List'}
        </ModalHeader>
        <ModalBody className=' flex items-center p-5 '>
        {modalType === 'followers' ? (
                         followersData.length>0?(
                            followersData.map((follower,index)=>(
                                <div className=' w-full flex items-center gap-2 '>
                                 <Avatar isBordered radius="full" size="md" src={follower.image} />
                                 <span className='font-roboto text-sm text-gray-500'>{follower.name}</span>
                                </div>
                            ))
                         ):(
                            <div>
                                No followers yet
                            </div>
                         )
                           
                        ) : (
                            followingData.length>0?(
                                followingData.map((follower,index)=>(
                                    <div className=' w-full flex items-center gap-2 '>
                                     <Avatar isBordered radius="full" size="md" src={follower.image} />
                                     <span className='font-roboto text-sm text-gray-500'>{follower.name}</span>
                                    </div>
                                ))
                             ):(
                                <div>
                                    No following yet
                                </div>
                             )
                        )}
        </ModalBody>
        <ModalFooter className='flex justify-between'>
                        <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                    </ModalFooter>
      </>
    </ModalContent>
  </Modal>
  )
}

export default FollowersList
