import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from '../../assets/trustt.png'
import {toast} from "react-toastify"
import { MdDashboard } from "react-icons/md";
import { FaUser,FaLock,FaUsers   } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { PiHandWithdrawFill } from "react-icons/pi";
import { IoIosHelpCircle } from "react-icons/io";



export default function Dashboard_SideBar({onClick}) {
    
  return (
    <>
    <div className='' >
        <div className='text-center text-3xl font-bold uppercase p-5 h-[150px] bg-black md:flex justify-center items-center hidden'> <Link to="/admin"> <img src={logo} alt="" /></Link></div>
        <div className='admin-bgcolor'>
            <ul>
                {/* Dashboard */}
                <li onClick={onClick} ><Link to='/admin/' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><MdDashboard className='inline  md:text-sm'/>&nbsp;&nbsp;Dashboard</Link></li>

                {/* Profile */}
               
                    <ul >
                        <li onClick={onClick} ><Link to='/admin/editprofile' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl md:font-semibold text-[15px]'> <FaUser className='inline text-sm'/>&nbsp;&nbsp;Profile</Link></li>
                        <li onClick={onClick} ><Link to='/admin/changepassword' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><FaLock  className='inline text-sm'/>&nbsp;&nbsp; Password</Link></li>
                    </ul>


                {/* Diposit */}
                <li onClick={onClick} ><Link to='/admin/users' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><FaUsers  className='inline text-sm'/>&nbsp;&nbsp;Users </Link></li>

               
                        <li onClick={onClick} ><Link to='/admin/deposithistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><AiFillDollarCircle className='inline text-sm'/>&nbsp;&nbsp;Deposit</Link></li>

                {/* WithDrawal section */}
               
                        <li onClick={onClick} ><Link to='/admin/withdrawalhistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><PiHandWithdrawFill className='inline text-sm'/>&nbsp;&nbsp; WithDrawal</Link></li>
                        <li onClick={onClick} ><Link to='/admin/contact' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:text-xl  md:font-semibold text-[15px]'><IoIosHelpCircle className='inline text-sm'/>&nbsp;&nbsp;  Enquire</Link></li>


                {/* My Team */}



                {/* Signuot */}
                <li><Link to='/login' onClick={()=>{
                    localStorage.removeItem("token");
                    toast.success("User logged out")
                }} className='block pl-5 p-2 text-red-700 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 lg:*:text-xl font-semibold'><RiLogoutCircleRLine  className='inline text-2xl' /> &nbsp;&nbsp;Signout</Link></li>
            </ul>
        </div>
    </div>
    </>
  )
}
