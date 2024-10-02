import React from 'react'
import { Table } from 'flowbite-react';
import Modal from 'react-modal';
import { Avatar } from '@nextui-org/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { blockUser,unBlockUser } from '../../Api/Admin';
import { useState } from 'react';

interface Userdata {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
    isAdmin: boolean;
    image?: string; 
  }

  interface Table1Props {
    users: Userdata[];
    fetchUsers: () => void;
  }
const Table1:React.FC<Table1Props> = ({users,fetchUsers}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [actionType, setAction] = useState('block');
    const [selectedUserId, setSelectedUserId] = useState<string|null>(null);
  
    const handleBlockUser = async (userId:string) => {
        try {
          const response = await blockUser( userId );
          toast.success(response?.data, {
            position: "top-center",
          });
          setModalIsOpen(false);
          fetchUsers(); 
        } catch (error) {
          toast.error("Error blocking user", {
            position: "top-center",
          });
        }
      };
    
      const handleUnblockUser = async (userId:string) => {
        try {
          const response = await unBlockUser( userId );
          toast.success(response?.data, {
            position: "top-center",
          });
          setModalIsOpen(false);
          fetchUsers(); 
        } catch (error) {
          toast.error("Error unblocking user", {
            position: "top-center",
          });
        }
      };
    
      const confirmAction = () => {
        if (actionType === "block") {
          handleBlockUser(selectedUserId!);
        } else {
          handleUnblockUser(selectedUserId!);
        }
      };
    
      const openModal = (type:'block'|'unblock', userId:string) => {
        setAction(type);
        setSelectedUserId(userId);
        setModalIsOpen(true);
      };
    

  return (
    <div className="overflow-x-auto ml-[54px]"> 
      
    <div className='mt-2 ml-5 mr-5 '>
    <Table >
      <Table.Head>
        <Table.HeadCell> Image </Table.HeadCell>
        <Table.HeadCell> Name </Table.HeadCell>
        <Table.HeadCell> Email </Table.HeadCell>
        <Table.HeadCell> Phone </Table.HeadCell>
        <Table.HeadCell> STATUS </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user, index) => (
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Avatar src={user?.image || ''} className='w-10 h-10 text-large' />
            </Table.Cell>
            <Table.Cell className='font-semibold'>{user.name}</Table.Cell>
            <Table.Cell className='font-semibold'>{user.email}</Table.Cell>
            <Table.Cell className='font-semibold'>{user.phone}</Table.Cell>
            <Table.Cell>
              <button
                className={
                  user.isBlocked
                    ? "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-3xl"
                    : "bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-3xl"
                }
                onClick={() => {
                  user.isBlocked ? openModal("unblock", user._id) : openModal("block", user._id);
                }}
                style={{ width: "100px", height: "40px" }}
              >
                {user.isBlocked ? <span>Unblock</span> : <span>Block</span>}
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Confirm Action"
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
              >
                <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
                <p className="mb-6">Are you sure you want to {actionType} this user?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    {actionType === "block" ? "Block" : "Unblock"}
                  </button>
                </div>
              </Modal>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    
    </div>
  </div>
  )
}

export default Table1
