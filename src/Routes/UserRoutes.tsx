import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLayout from '../Layout/UserLayout/UserLayout'
import Error404 from '../Pages/User/Error404'

const UserRoutes = () => { 
    const Home=lazy(()=>import('../components/User/Home'))
    const SignUp = lazy(()=>import('../Pages/User/SignUp'))
    const OTP = lazy(()=>import('../Pages/User/Otp'))
    const Login = lazy(()=>import('../Pages/User/Login'))
    const ListKennels = lazy(()=>import('../components/User/KennelList'))
    const ViewDetails = lazy(()=>import('../components/User/ViewDetails'))
    const Checkout = lazy(()=>import('../components/User/Checkout'))
    const Bookings = lazy(()=>import('../components/User/Bookings'))
    const SucessPage = lazy(()=>import('../components/User/SuccessPage'))
    const Profile = lazy(()=>import('../Pages/User/Profile'))
    const ProtectedRoute = lazy(()=>import('../Protected/ProtectedRoute'))
    const SocialMedia = lazy(()=>import('../Layout/SocialmediaLayout/SocialmediaLayout'))
    const Message = lazy(()=>import('../components/Socialmedia/ChatPage'))
    const Room = lazy(()=>import('../components/Socialmedia/Room'))
    const Fotp = lazy(()=>import('../Pages/User/ResetPasswordOtp'))
    const ResetPassword = lazy(()=>import('../Pages/User/ResetPassword'))

  return (
   <Suspense>
    <Routes>
      <Route></Route>
       <Route element={<UserLayout/>}>
       <Route index element={<Home/>}/>
       <Route path='/get-kennels' element={<ListKennels/>}/>
       <Route path='/view-details/:cageid/:fromdate/:todate' element={<ViewDetails/>}/>
       <Route element={<ProtectedRoute/>}>
       <Route path='/booking/:cageid/:fromdate/:todate' element={<Checkout/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
       </Route>
       </Route>
       <Route path='/success' element={<SucessPage/>}/>
       <Route path='register' element={<SignUp/>}/>
       <Route path='Otp' element={<OTP/>}/>
       <Route path='/fotp' element={<Fotp/>}/>
       <Route path='/reset-password' element={<ResetPassword/>}/>
       <Route path='login' element={<Login/> }/>
       <Route path='*' element={<Error404/>}/>
       <Route element={<ProtectedRoute/>}>
       <Route path='/adoption' element={<SocialMedia/>}/>
       </Route>
       <Route path='/message' element={<Message/>}/>
       <Route path='/room/:roomId' element={<Room/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
