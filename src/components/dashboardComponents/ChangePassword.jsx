import React, { useState } from 'react';

const ChangePassword = () => {
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    // Simulate OTP sending
    setOtpSent(true);
    alert('OTP sent to your registered email!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    alert('Password changed successfully!');
  };

  return (
    <div className="w-[80%] m-auto flex items-center rounded-xl justify-center background-color border">
      <div className="w-full p-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="oldPassword" className="text-gray-300">Old Password</label>
            <input
              type="password"
              id="oldPassword"
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