import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { RootState } from '../Redux/Store';
import { useSelector } from 'react-redux';
const KennelProtected = () => {
 const kennelOwnerData = useSelector((state:RootState) => state.kennel.kennelOwnerData);

  return (
    kennelOwnerData ?<Outlet/>:<Navigate to='/login' replace/>
  )
}

export default KennelProtected
