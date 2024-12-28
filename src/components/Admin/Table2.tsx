import React from 'react'
import { Table } from 'flowbite-react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { approveRequests,rejectRequests } from '../../Api/Admin';
import { useState } from 'react';


interface KennnelOwner{
    _id:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    isAdmin:boolean,
    isApproved:boolean
}

interface Table2Props {
    kennelOwners:KennnelOwner[];
    fetchKennelOwners: () => void;
  }

const Table2:React.FC<Table2Props> = ({kennelOwners,fetchKennelOwners}) => {
    const [modalIsOpen,setModalIsOpen] = useState<boolean>(false)
    const [actionType,setAction] = useState<'approve' | 'reject'|''>('')
    const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);


  const handleApprove = async () => {
    if (selectedOwnerId) {
      try {
        await approveRequests(selectedOwnerId);
        toast.success('Kennel Owner approved successfully');
        fetchKennelOwners(); // Refresh the list
        setModalIsOpen(false);
      } catch (error) {
        toast.error('Failed to approve Kennel Owner');
      }
    }
  };

  const handleReject = async () => {
    if (selectedOwnerId) {
      try {
        await rejectRequests(selectedOwnerId);
        toast.success('Kennel Owner rejected successfully');
        fetchKennelOwners(); // Refresh the list
        setModalIsOpen(false);
      } catch (error) {
        toast.error('Failed to reject Kennel Owner');
      }
    }
  };

  const openModal = (type: 'approve' | 'reject', ownerId: string) => {
    setAction(type);
    setSelectedOwnerId(ownerId);
    setModalIsOpen(true);
  };

  const confirmAction = () => {
    if (actionType === 'approve') {
      handleApprove();
    } else {
      handleReject();
    }
  };
  return (
    <div className="overflow-x-auto ml-[54px]">
    <div className='mt-2 ml-5 mr-5 '>
  <Table>
    <Table.Head>
  
      <Table.HeadCell> Name </Table.HeadCell>
      <Table.HeadCell> Email </Table.HeadCell>
      <Table.HeadCell> Phone </Table.HeadCell>
      <Table.HeadCell > STATUS </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
    {kennelOwners.map((user, index) => (
        <Table.Row key={index}  className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className='font-semibold'>{user.name}</Table.Cell>
          <Table.Cell className='font-semibold'>{user.email}</Table.Cell>
          <Table.Cell className='font-semibold'>{user.phone}</Table.Cell>
          <Table.Cell>
            <button className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-3xl'onClick={()=>openModal('approve',user._id)} >APPROVE</button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-3xl ml-2" onClick={()=>openModal('reject',user._id)}>REJECT</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={()=>setModalIsOpen(false)}
              contentLabel="Confirm Action"
              className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-20"
              overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
            >
              <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
              <p className="mb-6">Are you sure you want to {actionType} this user?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={()=>setModalIsOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                >
                 {actionType==='approve'?'APPROVE':'REJECT'}
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

export default Table2
