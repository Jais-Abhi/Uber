import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";



const Start = () => {

//     useEffect(() => {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: "smooth" // or "auto" for instant scroll
//     });
//   }, []);

  return (
    <div className='h-screen bg-gray-300 box-border w-full bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1557404763-69708cd8b9ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764")]' >
      <div className='flex flex-col justify-between h-screen w-full' >
        <div className=' w-full p-8 text-3xl font-semibold' >
            Uber
        </div>
        <div className=' bg-white w-full h-56 flex flex-col items-center p-4 justify-between' >
            <div className='text-2xl font-bold' >Get Started with Uber</div>
            <Link to="/user/login" 
            className='bg-black text-white p-4 rounded-full pl-28 flex gap-8 pr-28 items-center justify-center text-xl relative' >
                Continue 
                <span className='absolute right-8' ><FaArrowRightLong /></span>
            </Link>
            <div  className='pb-4' >
                By continuing, you agree to Uber's 
                <span className='text-blue-600 underline' >Terms of Service</span> and 
                <span className='text-blue-600 underline' >Privacy Policy</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Start
