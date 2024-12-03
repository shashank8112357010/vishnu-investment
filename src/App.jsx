import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom';




// shashank 
function App() {
  const location = useLocation()



  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return (
    <>

      <div className='fixed w-full z-50'>
      <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
