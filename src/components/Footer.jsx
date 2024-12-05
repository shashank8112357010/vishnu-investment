import React from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo from '../assets/trustt.png';

export default function Footer() {
  return (
    <div className='w-full h-auto bg-black p-8 md:p-10'>
      <div className='flex flex-col md:flex-row justify-start items-start text-white pt-10 md:pt-20'>
        <div className='w-full  mb-7 md:mb-0'>
          {/* <h1 className='text-3xl'>Logo Here</h1> */}
         <Link to='/'> <img src={logo} alt="" className='w-44  h-36' /></Link>
          {/* <p className='mt-2'>
            Join us at Trust Bot where we are committed to empowering the Forex and Commodity market with cutting-edge solutions and unwavering dedication to our customers.
          </p> */}
        </div>
        <div className='w-full  pl-0 md:pl-20 mb-10 md:mb-0'>
          <h1 className=' font-semibold mb-2 text-xl'>Useful Links</h1>
          <ul className='flex flex-col gap-'>
            <li><Link to='' className='hover:underline hover:text-red-500 cursor-pointer'>Home</Link></li>
            <li><Link to='/about' className='hover:underline hover:text-red-500 cursor-pointer'>About Us</Link></li>
            <li><Link to='/contactus' className='hover:underline hover:text-red-500 cursor-pointer'>Contact Us</Link></li>
            <li><Link to='/login' className='hover:underline hover:text-red-500 cursor-pointer'>Login</Link></li>
            <li><Link to='/register' className='hover:underline hover:text-red-500 cursor-pointer'>Register</Link></li>
          </ul>
        </div>
        <div className='w-full  text-xl font-semibold'>
          <h1 className='mb-3'>Follow Us on</h1>
          <div className='flex justify-start items-center gap-4'>
            <FaFacebookF className=' cursor-pointer hover:text-red-500 transition duration-300' />
            <FaTwitter className='cursor-pointer hover:text-red-500 transition duration-300' />
            <FaLinkedinIn className='cursor-pointer hover:text-red-500 transition duration-300' />
            <FaSquareInstagram className='cursor-pointer hover:text-red-500 transition duration-300' />
          </div>
        </div>
      </div>
      <div className='w-full h-[100px] mt-5'>
        <div className='border-t-2 border-dotted border-gray-600' />
        <p className='text-center text-white mt-3 text-sm'>© 2024 TRUSTBOT.IN . All rights reserved.</p>
      </div>
    </div>
  );
}
