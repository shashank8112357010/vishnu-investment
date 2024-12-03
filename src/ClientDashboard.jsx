import React, { useEffect } from 'react'
import './App.css'
import MainDashboard from './components/dashboardComponents/MainDashboard'



import { isTokenExpired, removeToken } from './utils/auth';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {

  let navigate=useNavigate()

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
      removeToken(); // Clear expired token
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);
  
  return (
    <div>
      <MainDashboard/>
    </div>
  )
}
