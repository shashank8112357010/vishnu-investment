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

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='' element={<App/>}>
      <Route path='/' element={<Hero/>}/>
      <Route path='/about' element={<AboutUs/>}/> 
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Route>
    <Route path='/dashboard' element={<ClientDashboard/>}>
    <Route path="/dashboard/" element={<Dashboard/>}/>
    <Route path='/dashboard/editprofile' element={<Editprofile/>}/>
    <Route path='/dashboard/changepassword' element={<ChangePassword/>}/>

    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
