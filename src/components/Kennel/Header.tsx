import React from 'react'
import { clearKenneldata } from '../../Redux/Slices/KennelSlice'
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate()

    const logout =()=>{
        dispatch(clearKenneldata())
        localStorage.removeItem('token')
        toast.success('logout successfully')
        navigate('/kennel/login')
     }
  return (
    <header className="bg-slate-200 py-4 px-6 flex justify-between items-center fixed left-0 right-0 top-0 z-50">
    <div className="text-white text-md flex items-center gap-3">
      <img src='/pics/file.png' className='w-10 h-10'  />
      <p className='mt-3 font-roboto text-black'>PETZONE</p>
    </div>
    <button
      className="bg-red-700 hover:bg-red-600 text-white text-sm font-roboto py-2 px-3 rounded-lg flex items-center"
      onClick={logout}
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  </header>
  )
}

export default Header
