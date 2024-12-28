import React, { useEffect } from 'react'
import { Button } from "@nextui-org/react";
import { useLocation,useNavigate } from 'react-router-dom';
import { InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot  } from '../../components/ui/input-otp';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { otpVerify} from '../../Api/User';
import errorHandle from '../../Api/Error';
import { resentforgototp,forgotPasswordOtp } from '../../Api/User';

const ResetPasswordOtp = () => {
    const [otp,setOtp] = useState<string>('')
    const [timer,setTimer] = useState<number>(0)
    const [isResendEnabled,setIsResendEnabled] = useState<boolean>(false)

    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
   
    useEffect(() => {
        const startTime = localStorage.getItem('otpStartTime');
        const currentTime = Math.floor(Date.now() / 1000);
    
        if (startTime) {
          const elapsedTime = currentTime - parseInt(startTime);
          const remainingTime = 120 - elapsedTime;
          if (remainingTime > 0) {
            setTimer(remainingTime);
            setIsResendEnabled(false);
          } else {
            setTimer(0);
            setIsResendEnabled(true);
          }
        } else {
          setTimer(120);
          localStorage.setItem('otpStartTime', currentTime.toString());
        }
      }, []);

      useEffect(()=>{
        if(timer>0){
          const intreval = setInterval(()=>{
             setTimer(prevTimer =>{
               const newTimer = prevTimer -1
               if(newTimer <=0){
                 clearInterval(intreval)
                 setIsResendEnabled(true)
                 return 0
               }
               return newTimer
             })
          },1000)
          return () => clearInterval(intreval);
        }
     },[timer])

     const handleButtonClick = async (e) =>{
        e.preventDefault()
        if(isResendEnabled){
           try {
               const response = await resentforgototp(data.email)
               if(response){
                toast.success(response.data.message)
                const currentTime = Math.floor(Date.now()/1000)
                localStorage.setItem('otpStartTime',currentTime.toString())
                setTimer(120)
                setIsResendEnabled(false)
               }
           } catch (error) {
             errorHandle(error)
           }
        }else{
            try {
                const response = await forgotPasswordOtp({otp:parseInt(otp)},{email:data.email})
                if(response){
                    toast.success(response.data.message)
                    localStorage.removeItem('otpStartTime')
                    navigate('/reset-password',{state:{email:data.email}})
                  }
            } catch (error) {
                errorHandle(error)
            }
        }
      }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-custom-gradient">
    <div className="max-w-md w-full space-y-8">
      <div>
        <motion.h2 className="mt-6 text-center text-3xl  text-gray-900"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
        >OTP VERIFICATION</motion.h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
      <div className='flex justify-center p-3'>
            <p className='text-lg'>Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
          </div>
        <motion.div className="space-y-4 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleButtonClick}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
            <InputOTPGroup>
                <InputOTPSlot index ={0}/>
                <InputOTPSlot index ={1}/>
                <InputOTPSlot index ={2}/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
            <InputOTPSlot index ={3}/>
            <InputOTPSlot index ={4}/>
            <InputOTPSlot index ={5}/>
            </InputOTPGroup>
          </InputOTP>

         

          <div className="mt-6">
            <Button
              type='submit'
              className="w-full bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
             {isResendEnabled?'RESEND OTP':'SUBMIT OTP'}
            </Button>
          </div>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
  )
}

export default ResetPasswordOtp
