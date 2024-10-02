import React from 'react'
import Header from '../../components/Admin/Header'
import Sidebar from '../../components/Admin/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
    <Header/>
       <div className='flex'>
       <div className='w-[18%]'>
       <Sidebar/>
       </div>
       <div className='w-[84%] mt-[72px]  '>
        <Outlet/>
       </div>
       </div>
  </div>
  )
}

export default AdminLayout
