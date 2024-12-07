import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addBankDetail,
  addBinanceDetail,
  addProfileDetail,
  fatchProfileDetail,
} from "../../services/api.service"; // Assuming your API call for bank details

// import { FaUser, FaBriefcase, FaBuilding, FaEdit, FaTimes } from 'react-icons/fa';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTimes, FaUserCircle, FaUniversity, FaBitcoin } from "react-icons/fa";

// Profile Edit Component
const EditProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Toggle for profile edit mode
  const [isEditingBank, setIsEditingBank] = useState(false); // Toggle for bank edit mode
  const [isEditingBinance, setIsEditingBinance] = useState(false); // Toggle for binance edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [userProfile, setUserProfile] = useState({
    firstName: "John ",
    lastName:"Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    dob: "1990-01-01",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  });

  const [bankDetails, setBankDetails] = useState({
    accountHolder: "John Doe",
    accountNumber: "**** **** **** 1234",
    bankName: "Chase Bank",
    swiftCode: "CHASUS33",
    routingNumber: "021000021"
  });

  const [binanceDetails, setBinanceDetails] = useState({
    binanceId: "johndoe123",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tradingLevel: "Advanced",
    kycStatus: "Verified"
  });

  const [isEditing, setIsEditing] = useState({
    profile: false,
    bank: false,
    binance: false
  });

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  };

  const handleEdit = (section) => {
    setIsEditing({ ...isEditing, [section]: !isEditing[section] });
  };

  const handleSave = (section) => {
    setIsEditing({ ...isEditing, [section]: false });
    // Here you would typically make an API call to save the changes
  };



  // Profile Data State
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    dob: "1990-01-01",
    profilePic: null, // To hold the profile picture URL or base64 data
  });

  useEffect(() => {
    fatchProfileDetail()
      .then((res) => {
        setUserProfile(res?.data?.profileData?.personalDetails);
        setBankData(res?.data?.profileData?.bankDetails);
        setBinanceData(res?.data?.profileData?.binanceDetails);
      })
      .catch((err) => {
      });
  }, []);

  // Bank Data State
  const [bankData, setBankData] = useState({
    bankName: "Bank A",
    accountHolderName: "John Doe",
    accountNumber: "1234567890",
    ifscCode: "BANK1234",
  });

  // Binance Data State
  const [binanceData, setBinanceData] = useState({
    accountEmail: "JohnBinance",
    walletAddress: "BINANCE12345",
  });

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prev) => ({
      ...prev,
      profilePic: file, // Save the base64 image data
    }));

  };

  // Profile Edit Handler
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await addProfileDetail({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      profilePic: profileData.profilePic, // Send the profilePic to the backend
      phone: profileData.phone,
      dob: profileData.dob,
    })
      .then((res) => {
      })
      .catch((err) => {
      });

    toast.success("Profile updated successfully!");
    setIsEditingProfile(false); // Exit edit mode
  };

  // Bank Edit Handler
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankUpdate = (e) => {
    e.preventDefault();
    addBankDetail({
      bankName: bankData.bankName,
      accountNumber: bankData.accountNumber,
      ifscCode: bankData.ifscCode,
      accountHolderName: bankData.accountHolderName,
    })
      .then((res) => {
      })
      .catch((err) => {
      });

    toast.success("Bank details updated successfully!");
    setIsEditingBank(false); // Exit edit mode
  };

  // Binance Edit Handler
  const handleBinanceChange = (e) => {
    const { name, value } = e.target;
    setBinanceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBinanceUpdate = (e) => {
    e.preventDefault();
    addBinanceDetail({
      walletAddress: binanceData.walletAddress,
      accountEmail: binanceData.accountEmail,
    })
      .then((res) => {
      })
      .catch((err) => {
      });

    toast.success("Binance details updated successfully!");
    setIsEditingBinance(false); // Exit edit mode
  };

  return (
    <div className="p-3 bg-gray-900  ">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
        Edit Profile
      </h1>
      <div className="font-sans h-screen flex flex-col justify-start ">
        <div className="relative bg-black rounded-xl shadow-xl overflow-x-hidden  w-full p-6 ">


          <div className="flex space-x-4  mb-6 border-b ">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center md:px-4 py-2 ${activeTab === "profile" ? "border-b-2 border-blue-500 text-blue-600" : "text-white"}`}
            >
              <FaUserCircle className="mr-2" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex items-center px-4 py-2 ${activeTab === "bank" ? "border-b-2 border-blue-500 text-blue-600" : "text-white"}`}
            >
              <FaUniversity className="mr-2" /> Bank Details
            </button>
            <button
              onClick={() => setActiveTab("binance")}
              className={`flex items-center px-4 py-2 ${activeTab === "binance" ? "border-b-2 border-blue-500 text-blue-600" : "text-white"}`}
            >
              <FaBitcoin className="mr-2" /> Binance Details
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="space-y-4 text-black">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  onError={handleImageError}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                  loading="lazy"
                />
                {isEditing.profile ? (
                  <div className="space-y-4 w-full max-w-md">
                    <input
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-white bg-gray-800"
                    />
                    <input
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-white bg-gray-800"
                    />
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-white bg-gray-800"
                    />
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-white bg-gray-800"
                    />
                    <input type="date"
                      value={userProfile.dob}
                      onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-white bg-gray-800"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{userProfile.firstName} {userProfile.lastName}</h2>
                    <p className="text-white">{userProfile.email}</p> 
                    <p className="text-white">{userProfile.phone}</p>
                    <p className="text-white">{userProfile.dob}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => isEditing.profile ? handleSave("profile") : handleEdit("profile")}
                className="px-4 py-2 bg-[#01137F] text-white rounded-md hover:bg-[#01137F]"
              >
                {isEditing.profile ? "Save" : "Edit"}
              </button>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="space-y-4 text-black">
              {isEditing.bank ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={bankDetails.accountHolder}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Account Holder Name"
                  />
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Account Number"
                  />
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Bank Name"
                  />
                  <input
                    type="text"
                    value={bankDetails.swiftCode}
                    onChange={(e) => setBankDetails({ ...bankDetails, swiftCode: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="SWIFT Code"
                  />
                  <input
                    type="text"
                    value={bankDetails.routingNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Routing Number"
                  />
                </div>
              ) : (
                <div className="space-y-2 text-white">
                  <p><strong>Account Holder:</strong> {bankDetails.accountHolder}</p>
                  <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                  <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                  <p><strong>SWIFT Code:</strong> {bankDetails.swiftCode}</p>
                  <p><strong>Routing Number:</strong> {bankDetails.routingNumber}</p>
                </div>
              )}
              <button
                onClick={() => isEditing.bank ? handleSave("bank") : handleEdit("bank")}
                className="px-4 py-2 bg-[#01137F] text-white rounded-md hover:bg-[#01137F]"
              >
                {isEditing.bank ? "Save" : "Edit"}
              </button>
            </div>
          )}

          {activeTab === "binance" && (
            <div className="space-y-4 text-black">
              {isEditing.binance ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={binanceDetails.binanceId}
                    onChange={(e) => setBinanceDetails({ ...binanceDetails, binanceId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Binance ID"
                  />
                  <input
                    type="text"
                    value={binanceDetails.walletAddress}
                    onChange={(e) => setBinanceDetails({ ...binanceDetails, walletAddress: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Wallet Address"
                  />
                  <input
                    type="text"
                    value={binanceDetails.tradingLevel}
                    onChange={(e) => setBinanceDetails({ ...binanceDetails, tradingLevel: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="Trading Level"
                  />
                  <input
                    type="text"
                    value={binanceDetails.kycStatus}
                    onChange={(e) => setBinanceDetails({ ...binanceDetails, kycStatus: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
                    placeholder="KYC Status"
                  />
                </div>
              ) : (
                <div className="space-y-2 text-white">
                  <p><strong>Binance ID:</strong> {binanceDetails.binanceId}</p>
                  <p><strong>Wallet Address:</strong> {binanceDetails.walletAddress}</p>
                  <p><strong>Trading Level:</strong> {binanceDetails.tradingLevel}</p>
                  <p><strong>KYC Status:</strong> {binanceDetails.kycStatus}</p>
                </div>
              )}
              <button
                onClick={() => isEditing.binance ? handleSave("binance") : handleEdit("binance")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEditing.binance ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>

      </div>






    </div>
  );
};

export default EditProfile;









