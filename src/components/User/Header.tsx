import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserdata } from '../../Redux/Slices/AuthSlice';
import { toast,Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { HiMenu } from 'react-icons/hi'; // Import the menu icon from react-icons

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state:RootState) => state.user.userdata);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleSignup = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(clearUserdata());
    toast.success('Logout successfully');
    navigate('/');
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileView = (userId: string) => {
    navigate(`/profile/${userId}`);;
  };

  const handleBookings = () => {
    navigate('/bookings');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='p-2 '>
      <Toaster position='top-center'/>
      <nav className='navbar flex justify-between items-center '>
        <div className='logo w-1/6 flex items-center justify-center'>
          <img src='pics/logo.jpg' className='w-10 h-10' alt='Logo' />
        </div>
        <div className='section w-2/3  hidden sm:flex justify-evenly '>
          {/* <ul className='flex justify-evenly '> */}
            <Link to={'/'} className=' text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>
              Home
            </Link>
            <Link to={'/#services'} className= 'text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Services</Link>
            <Link to={'/#features'} className='text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Features</Link>
            {/* <Link to={''} className='text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Contact</Link> */}
          {/* </ul> */}
        </div>
        <div className="sm:hidden flex-1 flex justify-end">
          <HiMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg sm:hidden">
            <ul className="flex flex-col items-center space-y-2 py-4">
              <Link to={'/'} className='text-small font-semibold font-roboto hover:text-purple-600 cursor-pointer transition duration-300'>
                Home
              </Link>
              <li className='text-small font-semibold font-roboto hover:text-purple-600 cursor-pointer transition duration-300'>Services</li>
              <li className='text-small font-semibold font-roboto hover:text-purple-600 cursor-pointer transition duration-300'>Feaures</li>
              <li className='text-small font-semibold font-roboto hover:text-purple-600 cursor-pointer transition duration-300'>Contact</li>
            </ul>
          </div>
        )}
        <div className='signup w-1/6 flex items-center justify-center mt-1'>
          {userdata ? (
            <Dropdown isOpen={dropdownVisible} onClose={() => setDropdownVisible(false)}>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  src={userdata.image}
                  onClick={handleDropdownToggle}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" onClick={()=>handleProfileView(userdata._id)} className='text-small font-bold '>
                <p className='text-small font-semibold text-gray-500'>view profile</p>
                </DropdownItem>
                <DropdownItem key="bookings" onClick={handleBookings}>
                <p className='text-small font-semibold text-gray-500'>bookings</p>
                </DropdownItem>
                <DropdownItem key="bookings" >
                <p className='text-small font-semibold text-gray-500'>Wallet: ${userdata.wallet}</p>
                </DropdownItem>
                <DropdownItem key="signout" onClick={handleSignOut}>
                <p className='text-small font-semibold text-gray-500'>signout</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg font-semibold"
              onClick={handleSignup}
            >
              SignIn
            </Button>
          )}
        </div>
      </nav>
      <div
        className="navbar-line bg-slate-300"
        style={{
          width: 'calc(100% - 25rem)',
          height: '1px',
         
          margin: '0 auto',
        }}
      ></div>
    </div>
  )
}

export default Header
