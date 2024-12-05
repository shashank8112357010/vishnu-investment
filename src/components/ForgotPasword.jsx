import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

function ForgotPassword() {
   const API_URL = "https://actl.co.in/vishnu"
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/forgot-password`, { email });
      toast.success('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error sending password reset link:', error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send the reset link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen welcome-main-container ">
      <div className="w-full max-w-md p-6 welcome-boxcontainer border rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-white ">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2  border rounded-md bg-gray-600 focus:outline-none focus:ring focus:ring-blue-400 text-white"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-[#071783] rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? <Loader color="white" size="6" /> : 'Send Reset Link'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-white">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
