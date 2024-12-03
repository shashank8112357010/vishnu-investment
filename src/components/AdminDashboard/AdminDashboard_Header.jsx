import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function AdminDashboard_Header() {
  return (
    <>
    <div className='w-full h-[70px] border-b-2 flex justify-between px-16 items-center'>
        <div><FaBarsStaggered className='inline text-3xl text-white cursor-pointer'/></div>
        <div><FaUserCircle className='inline text-4xl'/></div>
    </div>
      
    </>
  )
}
