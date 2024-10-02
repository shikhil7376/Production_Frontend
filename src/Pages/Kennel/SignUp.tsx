import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { toast } from 'react-toastify';
import { signup } from '../../Api/Kennel';
import { motion } from 'framer-motion';
import { Errors } from '../../Interface/DatatypeInterface';
import errorHandle from '../../Api/Error';

const Signup = () => {
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

    const submitHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
       try {
        e.preventDefault()
        const isValid = validateForm()
        if(isValid){
            const userData ={
                email:email,
                name:name,
                phone:phone,
                password:password 
            }
            const response = await signup(userData)
            if(response){
              toast.success(response.data.message)
              navigate('/kennel/otp',{
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
   <div className='flex h-screen'>
    <div className='w-1/2 h-screen'>
    <div className=' h-screen' style={{ backgroundImage: `url('/pics/signup.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className='flex p-5'>
    <img src='/pics/logo.jpg' className='w-10 h-10'  />
    <p className='mt-3 ml-3 font-serif font-semibold text-white'>PETZONE</p>
      
    </div>
    <div className=' flex flex-col justify-center items-center p- '>
    <motion.h1 initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{delay:0.2, x:{type:"spring",stiffness:60},opacity:{duration:0.8},ease:"easeIn",duration:3}} className='text-xl text-white font-semibold'>"Together, we can create a world where every pet<br></br> feels at home"</motion.h1>
    <motion.p initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{delay:0.2, x:{type:"spring",stiffness:60},opacity:{duration:0.8},ease:"easeIn",duration:3}} className=' font-medium text-white'>Start your journey with us today..</motion.p>
    </div>
    </div>
    </div>
    <div className='w-1/2 bg-lightwhite flex justify-center items-center'>
    <div className="bg-white w-[350px]  rounded-lg shadow-2xl p-3">
        <motion.h2 className="text-2xl text-gray-600  mb-6 text-center font-semibold "
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
          <div className="p-2">
            <label className="block text-gray-700 text-sm  mb-2 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-small"
              placeholder="Enter your name"
            />
                {errors.name && (
                  <p className="mt-2 text-sm font-semibold text-red-600">{errors.name}</p>
                )}
          </div>
          <div className="p-2">
            <label className="block text-gray-700 text-sm  mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-small"
              placeholder="Enter your email"
            />
             {errors.email && (
                  <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>
                )}
          </div>
          <div className="p-2">
            <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-small"
              placeholder="Enter your password"
            />
             {errors.password && (
                  <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>
                )}
          </div>
          <div className="p-2">
            <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="password">
              Mobile no
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-small"
              placeholder="Enter your mobile-no"
            />
               {errors.phone && (
                  <p className="mt-2 text-sm font-semibold text-red-600">{errors.phone}</p>
                )}
          </div>
          <div className="flex items-center justify-center">
        <button className='bg-purplebutton text-white font-semibold p-2 w-[100px] text-center rounded-lg text-small'>REGISTER</button>         
          </div>
        </form>
        </motion.div>
      </div>
    </div>
   </div>
  )
};

export default Signup;
