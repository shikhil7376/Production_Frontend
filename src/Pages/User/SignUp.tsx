import React, { FormEvent } from 'react'
import { useState } from 'react';
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { signup } from '../../Api/User';
import errorHandle from '../../Api/Error';
import { Errors } from '../../Interface/DatatypeInterface';


const SignUp = () => {
    const [name,setName] = useState<string>('')
    const[email,setEmail] = useState<string>('')
    const[password,setPassword] = useState<string>('')
    const[phone,setPhone] = useState<string>('')
    const[errors,setErrors] = useState<Errors>({})


    const navigate = useNavigate()
    const validateForm = ()=>{
        const newError:Errors = {}
        if(!name.trim()){
            newError.name ='Name is required'
        }
        if(!email.trim() || !validator.isEmail(email)){
            newError.email = "valid email is required"
        }
        if(!phone.trim()){
            newError.phone = 'phone is required'
        }else if(phone.length<10 || phone.length>10){
            newError.phone ='phone number must contain 10 numbers'
        }
        if(!password.trim()){
            newError.password ='Password is required'
        }else if(password.length<6){
            newError.password = 'Password must contain at least 6 characters'
        }
        setErrors(newError)
        return Object.keys(newError).length ===0
    }

    const submitHandler = async(e:FormEvent<HTMLFormElement>):Promise<void>=>{
       try {
        e.preventDefault()
        const isValid = validateForm();
        if(isValid){
        const userData = {
            email: email,
            name: name,
            phone: phone,
            password: password,
          };
          const response = await signup(userData)
          if(response){
            toast.success(response.data.message)
            navigate('/Otp',{
                state:{
                    email:email,
                    name:name,
                    password:password,
                    phone:phone
                }
            })
        }
      }
       } catch (error) {
         errorHandle(error)
       }
    }

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
     
    <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
      <motion.h2 className="text-2xl text-gray-600  mb-6 text-center font-semibold"
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
      >Sign Up</motion.h2>
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2, duration: 0.5 }}
      >
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
              {errors.name && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.name}</p>
              )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full text-sm  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
           {errors.email && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>
              )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
           {errors.password && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>
              )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold text-sm mb-2" htmlFor="password">
            Mobile no
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="shadow appearance-none border text-small rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your mobile-no"
          />
             {errors.phone && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.phone}</p>
              )}
        </div>
        <div className="flex items-center justify-center">
        <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg text-small font-semibold" type='submit' >
          SignUp
        </Button>
       
        </div>
      </form>
      </motion.div>
     
    </div>
  </div>
  )
}

export default SignUp
