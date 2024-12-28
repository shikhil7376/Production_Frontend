import React from 'react'
import Header from '../../Components/User/Header'
import Footer from '../../Components/User/Footer'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
  return (
    <div className='bg-custom-gradient h-[100vh] overflow-hidden'>
      <div className=' w-11/12 py-10 h-screen mx-auto overflow-y-scroll scrollbar-hide '>
        <div className='bg-white rounded-3xl shadow-md'>
          <div>
            <Header />
          </div>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
