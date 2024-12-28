import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import KennelLayout from '../Layout/KennelLayout/KennelLayout'
import KennelProtected from '../Protected/KennelProtected'

const KennelDashboard = lazy(()=>import('../Pages/Kennel/Dashboard'))
const KennelSignUp = lazy(()=>import('../Pages/Kennel/SignUp'))
const KennelSignIn = lazy(()=>import('../Pages/Kennel/SignIn'))
const KennelOtp = lazy(()=>import('../Pages/Kennel/Otp'))
const AddKennel = lazy(()=>import('../Pages/Kennel/AddKennel'))
const KennelProfile = lazy(()=>import('../Pages/Kennel/ProfilePage'))
const KennelBookings = lazy(()=>import('../components/Kennel/Bookings'))

const KennelRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<KennelLayout/>}>
        <Route element={<KennelProtected/>}>
         <Route path='/dashboard' element={<KennelDashboard/>}/>
         <Route path='/addkennel' element={<AddKennel/>}/>
         <Route path='/profile' element={<KennelProfile/>}/>
         <Route path='/bookings' element={<KennelBookings/>}/>
        </Route>
        </Route>
        <Route path='/signup' element={<KennelSignUp/>}/>
      <Route path='/otp' element={<KennelOtp/>}/>
      <Route path='/login' element={<KennelSignIn/>}/>
      </Routes>
    </Suspense>
  )
}

export default KennelRoutes
