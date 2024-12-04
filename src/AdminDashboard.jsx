import React, { useEffect } from 'react'
import AdminMainDashboard from './components/AdminDashboard/AdminMainDashboard'

export default function AdminDashboard() {
  useEffect(() => {
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
