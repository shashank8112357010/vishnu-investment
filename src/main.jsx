import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AboutUs from './components/AboutUs.jsx'
import ContactUs from './components/ContactUs.jsx'
import ClientDashboard from './ClientDashboard.jsx'
import Dashboard from './components/dashboardComponents/Dashboard.jsx'
import Editprofile from './components/dashboardComponents/Editprofile.jsx'
import ChangePassword from './components/dashboardComponents/ChangePassword.jsx'
import Deposit from './components/dashboardComponents/Deposit.jsx'
import DepositHistory from './components/dashboardComponents/DepositHistory.jsx'
import Withdrawal from './components/dashboardComponents/Withdrawal.jsx'
import WithdrawalHistory from './components/dashboardComponents/WithdrawalHistory.jsx'
import { ToastContainer } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='' element={<App />}>
        <Route path='/' element={<Hero />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route path='/dashboard' element={<ClientDashboard />}>
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path='/dashboard/editprofile' element={<Editprofile />} />
        <Route path='/dashboard/changepassword' element={<ChangePassword />} />
        <Route path='/dashboard/deposit' element={<Deposit />} />
        <Route path='/dashboard/deposithistory' element={<DepositHistory />} />
        <Route path='/dashboard/withdrawal' element={<Withdrawal />} />
        <Route path='/dashboard/withdrawalhistory' element={<WithdrawalHistory />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>,
)
