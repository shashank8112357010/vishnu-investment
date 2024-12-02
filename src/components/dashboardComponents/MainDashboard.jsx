import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Dashboard_SideBar from './Dashboard_SideBar'
import Dashboard_Header from './Dashboard_Header'

export default function MainDashboard() {
  const navigate=useNavigate()
  useEffect(()=>{
if(!localStorage.getItem('token')){
  navigate('/login')
}
  },[])
  return (
    <>
     <div className='w-full h-auto admin-bgcolor text-color flex'>
      <div className='md:w-[22%] h-screen overflow-auto admin-bgcolor hidden md:block sticky top-0'>
        <Dashboard_SideBar/>
      </div>
      <div className='w-full md:w-[78%] h-auto'>
        <Dashboard_Header/>
        <div className='w-full h-auto p-2 md:p-5'>
            <Outlet/>
        </div>
      </div>
    </div>     
    </>
  )
}
