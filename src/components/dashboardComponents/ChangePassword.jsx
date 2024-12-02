import React, { useState } from 'react';
import { changePassword } from '../../services/api.service';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset errors on each submission

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New Password and Confirm Password do not match!');
      return;
    }

    changePassword({oldPassword,newPassword}).then((res)=>{     
      toast.success("Password Change Successfully")
    }).catch((err)=>{
      console.log(err)
      toast.error(err?.response?.data?.message||"something went worng")
    })

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    console.log(oldPassword,newPassword,confirmPassword)
  };

  return (
    <div className="w-[80%] m-auto flex items-center rounded-xl justify-center background-color border">
      <div className="w-full p-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          <div className="flex flex-col space-y-1">
            <label htmlFor="oldPassword" className="text-gray-300">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="newPassword" className="text-gray-300">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword" className="text-gray-300">Re-Enter New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-Enter New Password"
              className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
