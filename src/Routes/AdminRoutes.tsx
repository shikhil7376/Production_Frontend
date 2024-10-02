import React from 'react'
import { Suspense,lazy } from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminProtected from '../Protected/AdminProtected'

const AdminLayout = lazy(()=>import('../Layout/AdminLayout/AdminLayout'))
const AdminDashboard = lazy(()=>import('../Pages/Admin/Dashboard'))
const Users = lazy(()=>import('../Pages/Admin/Users'))
const KennelApproval = lazy(()=>import('../Pages/Admin/KennelApproval'))
const VerifiedKennelOwner = lazy(()=>import('../Pages/Admin/VerifiedKennelOwner'))

const AdminRoutes = () => {
  return (
    <Suspense >
      <Routes>
        <Route element={<AdminLayout/>}>
        <Route element={<AdminProtected/>}>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
         <Route path='/users' element={<Users/>}/>
         <Route path='/kennelapproval' element={<KennelApproval/>}/>
         <Route path='/verifiedKennelOwner' element={<VerifiedKennelOwner/>}/>
        </Route>
        </Route>
      </Routes>
   </Suspense>
  )
}

export default AdminRoutes
