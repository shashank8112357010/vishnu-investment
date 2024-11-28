import React, { useState } from 'react';


const Editprofile = () => {
  // State for form inputs and uploads
  const [profileImage, setProfileImage] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    holderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  });
  const [upiDetails, setUpiDetails] = useState({
    upiName: '',
    upiId: '',
  });

  function handleChange(){

  }

  // Handlers for file upload
  const handleProfileImageChange = (e) => setProfileImage(URL.createObjectURL(e.target.files[0]));
  
  return (
    <div className="p-5">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 profile-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">User Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover mb-4"
            />
            <input type="file" onChange={handleProfileImageChange} className="mb-2" />
            <div className="text-lg font-semibold">Username</div>
            <div>User ID: 12345</div>
            <div>Email: user@example.com</div>
          </div>
          {/* Sponsor Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Sponsor Information</h3>
            <p>Sponsor Name: John Doe</p>
            <p>Joining Date: 2022-01-01</p>
          </div>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 personal-details-section slide-in-left">
        <h2 className="text-2xl font-bold mb-5 text-center">Personal Details</h2>
        <form className="space-y-4">
          {/* User ID and Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">Full Name</label>
              <input type="text" value="User Name" onChange={handleChange} className="w-full text-black p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium">Email ID</label>
              <input type="email" value="user@example.com" className="w-full text-black p-2 border rounded-lg" />
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">Mobile Number</label>
              <input type="tel" placeholder="Enter your mobile number" className="w-full text-black p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input type="date" className="w-full text-black p-2 border rounded-lg" />
            </div>
          </div>

          {/* Update and Edit Buttons */}
          <div className="flex justify-end mt-4 space-x-4">
            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded-lg">Update</button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg">Edit</button>
          </div>
        </form>
      </div>

      {/* Add New Bank Details Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 bank-details-section slide-in-up">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Bank Detail</h2>
        <form className="space-y-4">
          {/* Holder Name and Account Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">Holder Name</label>
              <input type="text" placeholder="Enter Holder Name" className="w-full p-2 border rounded-lg text-black" />
            </div>
            <div>
              <label className="block font-medium">A/c Number</label>
              <input type="text" placeholder="Enter A/c Number" className="w-full text-black p-2 border rounded-lg" />
            </div>
          </div>

          {/* IFSC Code and Bank Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">IFSC Code</label>
              <input type="text" placeholder="Enter IFSC Code" className="w-full text-black p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium">Bank Name</label>
              <select className="w-full p-2 border rounded-lg text-black">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
              </select>
            </div>
          </div>

          {/* Process Request Button */}
          <div className="flex justify-center mt-4">
            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded-lg">Process Request</button>
          </div>
        </form>
      </div>

      {/* Add New UPI Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 upi-details-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New UPI</h2>
        <form className="space-y-4">
          {/* UPI Name and UPI ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">UPI Name</label>
              <input type="text" placeholder="Enter UPI Name" className="w-full text-black p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium">UPI ID</label>
              <input type="text" placeholder="Enter UPI ID" className="w-full text-black p-2 border rounded-lg" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded-lg">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;