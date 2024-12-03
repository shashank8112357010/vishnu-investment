import React, { useState } from 'react';
import { changePassword } from '../../services/api.service';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from "../../components/Loader"

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading , setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      setLoading(false)
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match!")
      setLoading(false)
      return;
    }

    changePassword({ oldPassword, newPassword })
      .then(() => {
        toast.success('Password Changed Successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Something went wrong');
      });


  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Old Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="oldPassword" className="text-gray-300">Old Password</label>
            <div className="relative w-full">
              <input
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="w-full p-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showOldPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="newPassword" className="text-gray-300">New Password</label>
            <div className="relative w-full">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword" className="text-gray-300">Re-Enter New Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-Enter New Password"
                className="w-full p-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            {
              loading && loading ? <Loader size="6" color="white" /> : "Submit"
            }
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
