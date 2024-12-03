import React, { useEffect } from 'react'
import './App.css'
import MainDashboard from './components/dashboardComponents/MainDashboard'
import { useNavigate } from 'react-router-dom';



import { isTokenExpired, removeToken } from './utils/auth';

export default function ClientDashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    console.log(isTokenExpired(token) ,"isTokenExpired(token)");
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
