import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
   const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault();

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
      navigate('/reset-password')
    } catch (error) {
      console.error('Error sending password reset link:', error);
      toast.error('Failed to send the reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center ">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2  border rounded-md focus:outline-none focus:ring focus:ring-blue-400 justify-between"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-black ${
              loading ?<Loader color="white" size={"6"} />: 'Submit'
            }`}
          >
            {loading ? <Loader color="white" size={"6"}/> : 'Send Reset Link'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
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
