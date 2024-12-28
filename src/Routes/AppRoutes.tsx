import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'
import KennelRoutes from './KennelRoutes'
import UserRoutes from './UserRoutes'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/*' element={<UserRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        <Route path='/kennel/*' element={<KennelRoutes/>}/>
     </Routes>
  )
}

export default AppRoutes
