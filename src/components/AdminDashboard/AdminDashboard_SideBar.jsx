import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from '../../assets/trustt.png'
import {toast} from "react-toastify"




export default function Dashboard_SideBar() {
    
  return (
    <>
    <div className='' >
        <h1 className='text-center text-3xl font-bold uppercase p-5 h-[150px] bg-black flex justify-center items-center'> <Link to="/admin"> <img src={logo} alt="" /></Link></h1>
        <div className='admin-bgcolor'>
            <ul>
                {/* Dashboard */}
                <li><Link to='/admin/' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><AiFillDashboard className='inline text-2xl' /> &nbsp;&nbsp;Dashboard</Link></li>

                {/* Profile */}
               
                    <ul >
                        <li><Link to='/admin/editprofile' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'> <FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Edit Profile</Link></li>
                        <li><Link to='/admin/changepassword' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Change Password</Link></li>
                    </ul>


                {/* Diposit */}
               
                        <li><Link to='/admin/deposithistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp; Request History</Link></li>

                {/* WithDrawal section */}
               
                        <li><Link to='/admin/withdrawalhistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp; WithDrawal History</Link></li>


                {/* My Team */}



                {/* Signuot */}
                <li><Link to='/admin/login' onClick={()=>{
                    localStorage.removeItem("token");
                    toast.success("User logged out")
                }} className='block pl-5 p-2 text-red-700 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl font-semibold'><RiLogoutCircleRLine  className='inline text-2xl' /> &nbsp;&nbsp;Signout</Link></li>
            </ul>
        </div>
    </div>
    </>
  )
}
