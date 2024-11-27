import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { FaHouseUser } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { FaWallet } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from '../../assets/trustt.png'




export default function Dashboard_SideBar() {
    let [isOpen ,setIsOpen] = useState(false)
    let [isOpen1 ,setIsOpen1] = useState(false)
    let [isOpen2 ,setIsOpen2] = useState(false)
  return (
    <>
    <div className='' >
        <h1 className='text-center text-3xl font-bold uppercase p-5 h-[150px] bg-black flex justify-center items-center'> <Link to="/dashboard"> <img src={logo} alt="" /></Link></h1>
        <div className='admin-bgcolor'>
            <ul>
                {/* Dashboard */}
                <li><Link to='/dashboard/' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><AiFillDashboard className='inline text-2xl' /> &nbsp;&nbsp;Dashboard</Link></li>

                {/* Profile */}
                <li
                onClick={()=>setIsOpen(!isOpen)}
                ><Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaHouseUser  className='inline text-2xl' /> &nbsp;&nbsp;Profile{isOpen?<TiArrowSortedUp className='inline relative left-[145px]' />:<TiArrowSortedDown className='inline relative left-[145px]' />}</Link>
                    <ul className={`${isOpen?"block":"hidden"}`}>
                        <li><Link to='/dashboard/editprofile' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'> <FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Edit Profile</Link></li>
                        <li><Link to='/dashboard/changepassword' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Change Password</Link></li>
                    </ul>
                </li>


                {/* Diposit */}
                <li
                onClick={()=>setIsOpen1(!isOpen1)}
                ><Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaWallet   className='inline text-2xl' /> &nbsp;&nbsp;Deposit{isOpen1?<TiArrowSortedUp className='inline relative left-[135px]' />:<TiArrowSortedDown className='inline relative left-[135px]' />}</Link>
                    <ul className={`${isOpen1?"block":"hidden"}`}>
                        <li><Link to='/admin/sendrequest' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'> <FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Send Request</Link></li>
                        <li><Link to='/admin/requesthistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp; Request History</Link></li>
                    </ul>
                </li>

                {/* WithDrawal section */}
                <li
                onClick={()=>setIsOpen2(!isOpen2)}
                ><Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><BsBank2   className='inline text-2xl' /> &nbsp;&nbsp;WithDrawal{isOpen2?<TiArrowSortedUp className='inline relative left-[100px]' />:<TiArrowSortedDown className='inline relative left-[100px]' />}</Link>
                    <ul className={`${isOpen2?"block":"hidden"}`}>
                        <li><Link to='/admin/withdrawalsendrequest' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'> <FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp;Send Request</Link></li>
                        <li><Link to='/admin/withdrawalhistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl  font-semibold'><FaRegDotCircle className='inline text-sm'/>&nbsp;&nbsp; WithDrawal History</Link></li>
                    </ul>
                </li>




                {/* My Team */}



                {/* Signuot */}
                <li><Link to='/admin/' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear  border-b border-b-gray-500 text-xl font-semibold'><RiLogoutCircleRLine  className='inline text-2xl' /> &nbsp;&nbsp;Signout</Link></li>
            </ul>
        </div>
    </div>
    </>
  )
}
