import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
export default function Dashboard_Header({ onClick }) {
  return (
    <>
    <div className='w-full h-[70px] border-b-2 flex justify-between px-16 items-center'>
          <FaBarsStaggered className='md:inline text-3xl text-white cursor-pointer hidden'/>
        <div><FaBarsStaggered className='inline text-3xl text-white cursor-pointer md:hidden ' onClick={onClick}/></div>
        <div>
          </div>
        <div><FaUserCircle className='inline text-4xl'/></div>
    </div>
      
    </>
  )
}
