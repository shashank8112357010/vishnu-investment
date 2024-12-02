import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addBankDetail } from '../../services/api.service';


const Editprofile = () => {
  const [formValues, setFormValues] = useState({
    userId: "",
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formValues.userId.trim()) newErrors.userId = "User ID is required.";
    if (!formValues.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formValues.email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email))
      newErrors.email = "Enter a valid email address.";
    if (!formValues.mobile.trim() || !/^\d{10}$/.test(formValues.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formValues.dob.trim()) newErrors.dob = "Date of Birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // Perform update logic here
    }
  };


  // Deposit Data

  const [accountHolderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');

  const validateFields = () => {
    if (!accountHolderName || !accountNumber || !ifscCode || !bankName) {
      toast.error('All fields are required!');
      return false;
    }

    // Add more specific validation (e.g., account number length, IFSC code format)
    if (accountNumber.length < 10 || accountNumber.length > 18) {
      toast.error('Account number must be between 10 and 18 digits!');
      return false;
    }

    if (!/^[A-Z|a-z]{4}\d{7}$/.test(ifscCode)) {
      toast.error('Invalid IFSC code format!');
      return false;
    }

    if (bankName === 'Select Bank') {
      toast.error('Please select a valid bank!');
      return false;
    }

    return true;
  };
  const handleDepositSubmit = (e) => {
    e.preventDefault();
    // console.log(holderName,accountNumber,ifscCode,bankName)
    if (validateFields()) {
      addBankDetail({bankName,accountNumber,ifscCode,accountHolderName}).then((res)=>{
        console.log(res)
        toast.success('Bank details added successfully!');
        // Reset form
        setHolderName('');
        setAccountNumber('');
        setIfscCode('');
        setBankName('');
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.message)
      })
    }
  };



  return (
    <div className="p-5">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 profile-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">User Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={"https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover mb-4"
            />
            <input type="file"  className="mb-2" />
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
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 personal-details-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">Personal Details</h2>
        <form className="space-y-4">
          {/* User ID and Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium">User Id</label>
              <input type="text"  className="w-full text-black p-2 border rounded-lg" placeholder='ENter Your Full Name'
              name='userId'
              onChange={handleChange}
              value={formValues.userId}
              />
              {errors.userId && <span className="text-red-500 text-sm">{errors.userId}</span>}
            </div>
            <div>
              <label className="block font-medium">Full Name</label>
              <input type="text"  className="w-full text-black p-2 border rounded-lg" placeholder='ENter Your Full Name'
              name='fullName'
              onChange={handleChange}
              value={formValues.fullName}
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
            </div>
            
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
              <label className="block font-medium">Email ID</label>
              <input type="email"  className="w-full text-black p-2 border rounded-lg" placeholder='Enter Your Email Address' 
              name='email'
              onChange={handleChange}
              value={formValues.email}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label className="block font-medium">Mobile Number</label>
              <input type="tel" placeholder="Enter Your Mobile Number" className="w-full text-black p-2 border rounded-lg" 
              value={formValues.mobile}
              onChange={handleChange}
              name='mobile'
              />
            </div>
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input type="date" className="w-full text-black p-2 border rounded-lg" 
              onChange={handleChange}
              name='dob'
              value={formValues.dob}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-4">
            <button type="button" className="bg-[#181D8D] text-white py-2 px-4 rounded-lg">Update</button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg">Edit</button>
          </div>
          </div>

          {/* Update and Edit Buttons */}
          
        </form>
      </div>

      {/* Add New Bank Details Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 bank-details-section slide-in-up">
      <h2 className="text-2xl font-bold mb-5 text-center">Add New Bank Detail</h2>
      <form className="space-y-4" onSubmit={handleDepositSubmit}>
        {/* Holder Name and Account Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium">Holder Name</label>
            <input
              type="text"
              value={accountHolderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Enter Holder Name"
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block font-medium">A/c Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter A/c Number"
              className="w-full text-black p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* IFSC Code and Bank Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium">IFSC Code</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="Enter IFSC Code"
              className="w-full text-black p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Bank Name</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border rounded-lg text-black"
            >
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          </div>
        </div>

        {/* Process Request Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#181D8D] text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Process Request
          </button>
        </div>
      </form>
    </div>

      {/* Add Binance Account Section */}
      <div className="max-w-4xl mx-auto border background-color rounded-lg shadow-lg p-5 mt-5 upi-details-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Binance Detail</h2>
        <form className="space-y-4">
          {/* UPI Name and UPI ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium">Binance Name</label>
              <input type="text" placeholder="Enter UPI Name" className="w-full text-black p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium">Binance ID</label>
              <input type="text" placeholder="Enter UPI ID" className="w-full text-black p-2 border rounded-lg" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button type="button" className="bg-[#181D8D] text-white py-2 px-4 rounded-lg">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;