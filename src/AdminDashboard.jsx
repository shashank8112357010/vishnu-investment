import React, { useEffect } from 'react'
import AdminMainDashboard from './components/AdminDashboard/AdminMainDashboard'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AdminDashboard() {

  const navigate = useNavigate()
  const location = useLocation()

  // alert("hey");

  useEffect(() => {

    if(localStorage.getItem("role") != "admin") {
      navigate("/login")
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])
  return (
    <div>
      <AdminMainDashboard/>
    </div>
  )
}
