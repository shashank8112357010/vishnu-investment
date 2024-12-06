import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
export default function Dashboard_Header({ onClick, open }) {
  const [profileImg, setProfileImg] = useState(localStorage.getItem("profile"))

  return (
    <>
      <div className='w-full h-[70px] border-b-2 flex justify-between px-4 md:px-16 items-center'>
        <FaBarsStaggered className='md:inline text-3xl text-white cursor-pointer hidden' />

        {
          open && open ? <div><FaBarsStaggered className='inline text-3xl text-white cursor-pointer md:hidden ' onClick={onClick} /></div> :

            <div><IoCloseSharp className='inline text-3xl text-white cursor-pointer md:hidden ' onClick={onClick} /></div>
        }

        <div>
        </div>
        <div className='w-[50px] h-[50px] border rounded-full overflow-hidden'><img src={profileImg} alt="" /></div>
      </div>

    </>
  )
}
