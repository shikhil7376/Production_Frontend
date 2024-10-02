import React from 'react'
import Header from '../../components/Kennel/Header'
import Sidebar from '../../components/Kennel/Sidebar'
import { Outlet } from 'react-router-dom'

const KennelLayout = () => {
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div className='flex'>
         <div className='w-[18%] pt-2 '>
         <Sidebar/>
         </div>
         <div className='w-[84%] mt-[72px]'>
          <Outlet/>
         </div>
         </div>
    </div>
  )
}

export default KennelLayout
