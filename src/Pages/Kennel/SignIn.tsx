import React from 'react'
import validator from 'validator';
import { login } from '../../Api/Kennel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setKennelCredential } from '../../Redux/Slices/KennelSlice';
import { useState, useEffect } from 'react';
import { RootState } from '../../Redux/Store';
import { Errors } from '../../Interface/DatatypeInterface';

const SignIn = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [errors, setErrors] = useState<Errors>({})

   const check = () => {
      if (kennelOwnerData) {
         navigate('/kennel/dashboard')
      }
   }
   useEffect(() => {
      check()
   }, [])


   const validateForm = () => {
      const newErrors: Errors = {}
      if (!email.trim() || !validator.isEmail(email)) {
         newErrors.email = 'valid email is required'
      }
      if (!password.trim()) {
         newErrors.password = 'password is required'
      } else if (password.length < 6) {
         newErrors.password = 'password must contain at least 6 characters'
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }
   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const isValid = validateForm()
      if (isValid) {
         const data = {
            email: email,
            password: password
         }
         const response = await login(data);
         if (response?.data) {
            localStorage.setItem('token', response.data.token)
            dispatch(setKennelCredential(response.data.message))
            navigate('/kennel/dashboard')
         }
      }
   }
   return (
      <div className="h-screen flex justify-center items-center bg-lightwhite">
         <div className='w-[400px] h-[450px]  shadow-2xl ' style={{ backgroundImage: `url('/pics/signin.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='flex justify-center items-center h-full  '>
               <form onSubmit={submitHandler}>
                  <div className=' p-5'>
                     <div className="p-2  ">
                        <label className="block text-black text-sm  mb-2 font-semibold" htmlFor="email">
                           Email
                        </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           value={email}
                           className="shadow appearance-none border rounded-full w-full py-2 px-6 leading-tight focus:outline-none focus:shadow-outline text-small backdrop-blur-sm bg-white/30 placeholder-black"
                           placeholder="Enter your email"
                           onChange={(e) => setEmail(e.target.value)}

                        />
                        {errors.email && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>}

                     </div>
                     <div className="p-2">
                        <label className="block text-black text-sm mb-2 font-semibold" htmlFor="password">
                           Password
                        </label>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           value={password}
                           className="shadow appearance-none border rounded-full w-full py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-small backdrop-blur-sm bg-white/30 placeholder-black"
                           placeholder="Enter your password"
                           onChange={(e) => setPassword(e.target.value)}

                        />
                        {errors.password && <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>}

                     </div>
                     <div className="flex items-center justify-center">
                        <button className='bg-purplebutton text-white font-semibold p-2 w-[100px] text-center rounded-lg text-small'>SIGNIN</button>
                     </div>

                  </div>
               </form>

            </div>

         </div>

      </div>
   )
}

export default SignIn
