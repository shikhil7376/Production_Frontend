import React, { useState,useEffect, FormEvent } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredential } from "../../Redux/Slices/AuthSlice";
import { setAdminCredential } from "../../Redux/Slices/AdminSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import validator from "validator";
import { login } from "../../Api/User"
import Fmodal from "../../components/Common/ForgotPassword/Fmodal";
import { useSelector } from "react-redux";
import OAuth from "../../components/User/OAuth";
import { Input } from "../../components/ui/input";
import { RootState } from "../../Redux/Store";
import { Errors } from "../../Interface/DatatypeInterface";
import errorHandle from "../../Api/Error";


  
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

    const userdata = useSelector((state:RootState)=>state.user.userdata)
    
  const check = ()=>{
    if(userdata){
      navigate('/')
    }
  }
  useEffect(()=>{
     check()
  },[])

  const validateForm = () => {
    const newErrors:Errors = {};
    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
          const data = {
            email: email,
            password: password,
          };
          const response = await login(data);     
          if(response && response.data.isAdmin) {
            localStorage.setItem('token', response.data.token);
            dispatch(setAdminCredential(response.data.message));
            navigate('/admin/dashboard');
          } else if(response && response.data) { 
            localStorage.setItem('token', response.data.token);         
            dispatch(setCredential(response?.data.message));
            navigate('/');
          }
        }
    } catch (error) {
      errorHandle(error)
      console.log(error,"error");
         
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient ">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
        <motion.h1
          className="text-3xl font-semibold mb-8 md:ml-24 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, Welcome! 👋
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="email">
                Email
              </label>
              <Input type="email" name='email' id='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {errors.email && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="password">
                Password
              </label>
              <Input type="password" name='password' id='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

              {errors.password && <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between ">
           <Fmodal />
            </div>
            <div className="flex items-center justify-center">
              <Button
                radius="full"
                className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg text-small font-semibold"
                type="submit"
              >
                SignIn
              </Button>
            </div>
          </form>
        </motion.div>

        <div className="mt-4 text-center flex justify-center">
             <OAuth/>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-semibold">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
