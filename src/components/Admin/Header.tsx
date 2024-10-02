import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearAdminData } from "../../Redux/Slices/AdminSlice";

const Header = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(clearAdminData());
        toast.success("Logout Successfully");
        navigate("/login");
    };
  return (
    <header className="bg-slate-200 py-4 px-6 flex justify-between items-center fixed left-0 right-0 top-0 z-50">
      <div className="text-white  text-md flex items-center gap-3">
        {/* <span className="text-green-500 text-2xl">Paw</span>
        <FaPaw /> */}
    <img src='/pics/file.png' className='w-10 h-10'  />
    <p className='mt-3  font-semibold  text-black
    '>PETZONE</p>

    </div>
      <button
        className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center"
        onClick={logout}
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </header>
  )
}

export default Header
