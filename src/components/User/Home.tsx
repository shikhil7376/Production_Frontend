import React from 'react'
import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { StickyScroll } from '../ui/sticky-scroll-reveal';
import { useLocation } from 'react-router-dom';
import { useEffect,useRef } from 'react';

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash === "#services") {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === "#features") {
      featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

  }, [location]);

  const content = [
    {
      title: "Dog Boarding Services",
      description:
        " Book secure and comfortable cages for your pets with ease! Our trusted kennel owners offer flexible boarding services where you can select dates, view available cages, and make hassle-free online payments.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
           <img
            src="/pics/signup.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Pet Adoption Platform",
      description:"Find your perfect furry friend with our adoption platform. Explore adoption posts, like and comment on pet profiles, and connect with potential adopters or pet lovers. Give a dog a new home today!",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
            src="https://cdn.pixabay.com/photo/2021/11/22/15/48/dog-6816752_1280.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Connect & Communicate",
      description:" Stay connected with other pet enthusiasts! Our platform offers chat, video call, and notification features to ensure you can easily communicate with kennel owners and other users. Follow, unfollow, or chat with ease.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
         
          <img
            src="https://cdn.pixabay.com/photo/2018/03/11/06/14/talk-3216074_1280.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Exclusive Benefits for Pet Owners",
      description:"Enjoy a seamless experience with PetZone! Easily book pet boarding services, explore adoption opportunities, and stay connected with our vibrant pet-loving community. Get notifications, chat with other users, and enjoy peace of mind with secure payments and trusted services tailored just for you.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          <img
            src="https://cdn.pixabay.com/photo/2017/10/07/16/21/dog-2826918_1280.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
  ];

  return (
    <div className=''>
      
      <div className='mt-5 flex sm:flex-nowrap flex-wrap'>
        
        <div className='w-full sm:w-[50%] flex flex-col justify-center items-center '>
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            className=' text-xl sm:text-2xl md:text-4xl font-semibold  mb-4 text-center font-roboto '>
            Welcome to<br />
            <span className='text-xl sm:text-2xl md:text-4xl text-gradient font-roboto'>Pet Zone</span>
          </motion.h1>
          <motion.p
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 0.6 }, ease: "easeIn", duration: 1 }}
  className='text-sm sm:text-base md:text-md lg:text-md xl:text-md text-gray-400 text-center  font-roboto p-2 md:p-0'>
  "Your Trusted Partner For Pet Boarding And Adoption"
</motion.p>
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg mt-3 font-semibold hidden sm:block">
            Get Started
          </Button>
        </div>
    
        <div className='w-full sm:w-[50%] flex items-start justify-center '>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            src='pics/fffff-min.jpg ' className='md:rounded-3xl w-[95%] sm:w-[90%] mx-auto' />
        </div>
      </div>
      <div ref={servicesRef} className='display mt-10'>
        <div className='flex justify-center p-5 font-roboto font-semibold  md:text-xl'>OUR SERVICES</div>
        <div className='display flex justify-center'>
        <div className='bg-lightwhite p-5 w-full sm:w-[60%] flex flex-col sm:flex-row justify-evenly items-center rounded-md'>
        <div className='card h-[250px] w-[70%] sm:w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl mb-4 sm:mb-0'>
        <Image
                isBlurred
                width={100}
                height={100}
                src="pics/boarding.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold mt-2 font-roboto '>BOARDING</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white font-roboto font-semibold shadow-lg mt-10" onClick={() => navigate('/get-kennels')}>
                Explore
              </Button>
            </div>
            <div className='card h-[250px] w-[70%] sm:w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl'>
            <Image
                isBlurred
                width={100}
                height={100}
                src="pics/signin.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold font-roboto mt-2'>ADOPTION</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] font-semibold font-roboto text-white shadow-lg mt-10" onClick={()=>navigate('/adoption')}>
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=' display flex flex-wrap mt-10'>
        <div className=' w-full sm:w-[50%] flex items-center justify-center p-5 md:p-0 '>
          <img src='https://cdn.pixabay.com/photo/2014/04/03/11/38/pet-312041_1280.png'  className='object-contain md:h-[60%] md:w-[50%]'/>
        </div>
        <div className='w-full sm:w-[50%] bg-slate-30  '>
          <div className='flex justify-center '>
            <div className='bg-white h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/retriever.png' className='h-full w-full object-cover' /></div>
          </div>
          <div className='display flex justify-evenly '>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/beagle.jpg' className='h-full w-full object-cover' />
            </div>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/rottt.jpg' className='h-full w-full object-cover' />
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center  overflow-hidden drop-shadow-md'>
              <img src='pics/cane.png' className='h-full w-full object-cover' />
            </div>
          </div>
        </div>
      </div>
      <div ref={featuresRef}  className="md:p-10 ">
        <h2 className='text-center font-roboto font-semibold text-xl p-5 '>FEATURES</h2>
      <StickyScroll content={content} />
    </div>
    </div>
  )
}

export default Home
