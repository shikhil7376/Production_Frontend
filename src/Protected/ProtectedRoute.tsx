import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet} from 'react-router-dom'
import { RootState } from '../Redux/Store'
const ProtectedRoute = () => {
    const userData = useSelector((state:RootState)=>state.user.userdata)
  return (
    userData?<Outlet/>:<Navigate to='/' replace/>
  )
}

export default ProtectedRoute
