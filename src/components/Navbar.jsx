'use client'

import React from 'react'
import { Link } from 'react-router-dom'; // Use React Router's Link for better routing
import { Menu, X } from 'lucide-react'
import logo from '../assets/trustt.png'

const menuItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact Us', to: '/contactus' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="relative w-full bg-black h-20">
      <div className="mx-auto h-20 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="inline-flex items-center space-x-2">
          <div className="text-xl">
            {/* Responsive Logo */}
            <Link to='/'>
              <img
                src={logo}
                alt="Trust Bot Logo"
                className="w-24 lg:w-28 lg:h-22" // Adjusting width/height based on screen size
              />
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  onClick={closeMenu}
                  className="text-lg uppercase font-bold text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Register Buttons */}
        <div className="hidden lg:block">
          <Link
            to='/login'
            className="rounded-md uppercase bg-[#071783] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0e0f41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-2"
          >
            Login
          </Link>
          <Link
            to='/register'
            className="rounded-md uppercase bg-[#071783] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0e0f41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" onClick={toggleMenu} aria-hidden="true" />
          ) : (
            <Menu onClick={toggleMenu} className="h-8 text-white w-6 cursor-pointer" />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 top-16 z-50 origin-top-right transform transition-y duration-300 ease-out-in lg:hidden ${
            isMenuOpen ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
          }`}
          style={{ overflow: 'hidden' }} // Ensure smooth collapsing
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-black shadow-lg ring-1 ring-white ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              {/* Mobile Menu Links */}
              <div className="mt-6 text-center">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={closeMenu}
                      className="uppercase flex items-center justify-center p-3 text-sm font-semibold text-white"
                    >
                      <span className="text-base font-medium text-white">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Login/Register Buttons */}
              <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                <Link
                  to='/login'
                  onClick={closeMenu}
                  className="w-full uppercase text-center rounded-md bg-[#071783] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Login
                </Link>
                <Link
                  onClick={closeMenu}
                  to='/register'
                  className="w-full uppercase rounded-md text-center bg-[#071783] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
