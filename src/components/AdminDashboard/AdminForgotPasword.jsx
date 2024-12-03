import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

function AdminForgotPassword() {
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
      await axios.post(`${API_URL}/admin/forgot-password`, { email });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-black rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? <Loader color="white" size="6" /> : 'Send Reset Link'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Remembered your password?{' '}
          <a href="/admin/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
