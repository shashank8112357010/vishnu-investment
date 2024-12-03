import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { FaHouseUser, FaRegDotCircle, FaWallet } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import logo from '../../assets/trustt.png'
import { toast } from "react-toastify";

export default function Dashboard_SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isVerified, setIsVerified] = useState(false);  // To track if user is verified
    const navigate = useNavigate();


    // Fetch isVerified status from localStorage
    useEffect(() => {
        const verifiedStatus = JSON.parse(localStorage.getItem("isVerified"));
        setIsVerified(verifiedStatus);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isVerified");
        toast.success("User logged out");
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <div className=''>
            <h1 className='text-center text-3xl font-bold uppercase p-5 h-[150px] bg-black md:flex justify-center items-center hidden'>
                <Link to="/dashboard"> <img src={logo} alt="Logo" className='w-[150px]'/></Link>
            </h1>
            <div className='admin-bgcolor w-full'>
                <ul>
                    {/* Dashboard */}
                    <li className=''>
                        <Link to='/dashboard/' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                            <AiFillDashboard className='inline text-2xl' /> &nbsp;&nbsp;Dashboard

                        </Link>
                    
                    </li>

                    {/* Profile */}
                    <li onClick={() => setIsOpen(!isOpen)} >
                        <Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                            <FaHouseUser className='inline text-2xl' /> &nbsp;&nbsp;Profile
                            {isOpen ? <TiArrowSortedUp className='inline relative  left-[145px]' /> : <TiArrowSortedDown className='inline relative left-[145px]' />}
                        </Link>
                        <ul className={`${isOpen ? "block" : "hidden"}`}>
                            <li>
                                <Link to='/dashboard/editprofile' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                    <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp;Edit Profile
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/changepassword' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                    <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp;Change Password
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Deposit */}
                    {isVerified ? (
                        <li onClick={() => setIsOpen1(!isOpen1)}>
                            <Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                <FaWallet className='inline text-2xl' /> &nbsp;&nbsp;Deposit
                                {isOpen1 ? <TiArrowSortedUp className='inline relative left-[135px]' /> : <TiArrowSortedDown className='inline relative left-[135px]' />}
                            </Link>
                            <ul className={`${isOpen1 ? "block" : "hidden"}`}>
                                <li>
                                    <Link to='/dashboard/deposit' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                        <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp;Send Request
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/deposithistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                        <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp; Request History
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <li className="text-gray-500 pl-5 p-2 text-xl font-semibold cursor-not-allowed">
                            <FaWallet className='inline text-2xl' /> &nbsp;&nbsp;Deposit  Locked
                        </li>
                    )}

                    {/* Withdrawal */}
                    {isVerified ? (
                        <li onClick={() => setIsOpen2(!isOpen2)}>
                            <Link to='#' className='block pl-5 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                <BsBank2 className='inline text-2xl' /> &nbsp;&nbsp;WithDrawal
                                {isOpen2 ? <TiArrowSortedUp className='inline relative left-[100px]' /> : <TiArrowSortedDown className='inline relative left-[100px]' />}
                            </Link>
                            <ul className={`${isOpen2 ? "block" : "hidden"}`}>
                                <li>
                                    <Link to='/dashboard/withdrawal' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                        <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp;Send Request
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/withdrawalhistory' className='block pl-10 p-2 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                                        <FaRegDotCircle className='inline text-sm' />&nbsp;&nbsp; Withdrawal History
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <li className="text-gray-500 pl-5 p-2 text-xl font-semibold cursor-not-allowed">
                            <BsBank2 className='inline text-2xl' /> &nbsp;&nbsp;Withdrawal Locked
                        </li>
                    )}

                    {/* Signout */}
                    <li>
                        <Link to='/login' onClick={handleLogout} className='block pl-5 p-2 text-red-700 hover:bg-gray-700 active:bg-slate-950 ease-linear border-b border-b-gray-500 text-xl font-semibold'>
                            <RiLogoutCircleRLine className='inline text-2xl' /> &nbsp;&nbsp;Signout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
