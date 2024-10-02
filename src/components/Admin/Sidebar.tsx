import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser, HiLibrary  } from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <div className='mt-8  h-screen '>
    <Sidebar aria-label="Default sidebar example" className='w-[230px] rounded-2xl'>
   <Sidebar.Items className="mt-8  ">
     <Sidebar.ItemGroup>
       <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
       <p className='text-small font-semibold'> Dashboard</p>
       </Sidebar.Item>
       <Sidebar.Item href="/admin/users" icon={HiUser}>
       <p className='text-small font-semibold'> Users</p>
       </Sidebar.Item>
       <Sidebar.Item href="/admin/kennelapproval" icon={ HiLibrary } labelColor="dark">
       <p className='text-small font-semibold'>Kennel Approval</p>
       </Sidebar.Item>
       <Sidebar.Item href="/admin/verifiedKennelOwner" icon={HiArrowSmRight}>
          <p className='text-small font-semibold'>Kennel Owners</p>
       </Sidebar.Item>
     </Sidebar.ItemGroup>
   </Sidebar.Items>
 </Sidebar>
 </div>
  )
}

export default AdminSidebar
