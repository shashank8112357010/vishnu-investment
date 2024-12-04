import React, { useState } from 'react';
import { changePassword } from '../../services/api.service';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from "../../components/Loader";

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match!");
      setLoading(false);
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword });
      toast.success('Password Changed Successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col justify-start items-start">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md text-black font-bold uppercase">
        Change Password
      </h1>
      <div className="w-full  bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Fields */}
          {[{
            id: 'oldPassword',
            label: 'Old Password',
            value: oldPassword,
            setValue: setOldPassword,
            showPassword: showOldPassword,
            setShowPassword: setShowOldPassword,
          }, {
            id: 'newPassword',
            label: 'New Password',
            value: newPassword,
            setValue: setNewPassword,
            showPassword: showNewPassword,
            setShowPassword: setShowNewPassword,
          }, {
            id: 'confirmPassword',
            label: 'Re-Enter New Password',
            value: confirmPassword,
            setValue: setConfirmPassword,
            showPassword: showConfirmPassword,
            setShowPassword: setShowConfirmPassword,
          }].map(({ id, label, value, setValue, showPassword, setShowPassword }) => (
            <div key={id} className="flex flex-col space-y-1">
              <label htmlFor={id} className="text-gray-300">{label}</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={label}
                  className="w-full p-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={label}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  aria-label={`Toggle ${label}`}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader size="6" color="white" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
