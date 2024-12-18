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
import ForgotPassword from './components/ForgotPasword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import Admin_Dashboard from './components/AdminDashboard/Admin_Dashboard.jsx'
import AdminEditprofile from './components/AdminDashboard/AdminEditprofile.jsx'
import AdminChangePassword from './components/AdminDashboard/AdminChangePassword.jsx'
import AdminDepositHistory from './components/AdminDashboard/AdminDepositHistory.jsx'
import AdminWithdrawalHistory from './components/AdminDashboard/AdminWithdrawalHistory.jsx'
import AdminLogin from './components/AdminDashboard/AdminLogin.jsx'
import AdminResetPassword from './components/AdminDashboard/AdminResetPassword.jsx'
import AdminForgotPassword from './components/AdminDashboard/AdminForgotPasword.jsx'
import Admin_Users from './components/AdminDashboard/Admin_Users.jsx'
import UserContact from './components/AdminDashboard/UserContact.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='' element={<App />}>
        <Route path='/' element={<Hero />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/:ReferalCode?' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token?' element={<ResetPassword />} />
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
      <Route path='/admin' element={<AdminDashboard />}>
        <Route path='/admin/' element={<Admin_Dashboard />} />
        <Route path='/admin/editprofile' element={<AdminEditprofile />} />
        <Route path='/admin/changepassword' element={<AdminChangePassword />} />
        <Route path='/admin/deposithistory' element={<AdminDepositHistory />} />
        <Route path='/admin/users' element={<Admin_Users />} />
        <Route path='/admin/contact' element={<UserContact />} />
        <Route path='/admin/withdrawalhistory' element={<AdminWithdrawalHistory />} />
      </Route>
      <Route>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={1200}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <RouterProvider router={router} />
  </StrictMode>,
)
