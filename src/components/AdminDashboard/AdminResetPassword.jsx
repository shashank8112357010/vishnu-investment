import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons for password visibility
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';

function AdminResetPassword() {
  const API_URL = "https://actl.co.in/vishnu"
  const { token } = useParams(); // Extract token from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate input
  const validate = () => {
    const { newPassword, confirmPassword } = formData;
    if (!newPassword) {
      toast.error('New password is required');
      return false;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmPassword,
      });
      toast.success('Password reset successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center pt-20 justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter new password"
            />
            <span
              className="absolute right-3 top-[40px] transform cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Confirm new password"
            />
            <span
              className="absolute right-3 top-[40px] transform cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-black ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? <Loader color="white" size="6" /> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminResetPassword;
