import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addBankDetail,
  addBinanceDetail,
  addProfileDetail,
  fatchProfileDetail,
} from "../../services/api.service"; // Assuming your API call for bank details

// Profile Edit Component
const AdminEditprofile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Toggle for profile edit mode
  const [isEditingBank, setIsEditingBank] = useState(false); // Toggle for bank edit mode
  const [isEditingBinance, setIsEditingBinance] = useState(false); // Toggle for binance edit mode

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
        setProfileData(res?.data?.profileData?.personalDetails);
        setBankData(res?.data?.profileData?.bankDetails);
        setBinanceData(res?.data?.profileData?.binanceDetails);
      })
      .catch((err) => {
        console.log(err?.response?.data);
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

  const handleProfileUpdate = async(e) => {
    e.preventDefault();
   await  addProfileDetail({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      profilePic: profileData.profilePic, // Send the profilePic to the backend
      phone: profileData.phone,
      dob: profileData.dob,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    toast.success("Binance details updated successfully!");
    setIsEditingBinance(false); // Exit edit mode
  };

  return (
    <div className="p-5">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto border bg-gray-900 text-white  rounded-lg shadow-lg p-5 profile-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">User Profile...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={profileData.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover mb-4"
            />
            <input
              type="file"
              className="mb-2"
              onChange={handleImageChange} // Trigger the image change handler
            />
          </div>
          {/* Profile Information */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <div className="text-lg font-semibold">
              User Name {profileData?.firstName} {profileData?.lastName}
            </div>
            <div>Email: {profileData?.email}</div>
            <div>Phone: {profileData.phone}</div>
            <div>
              Date of Birth:{" "}
              {(() => {
                if (!profileData.dob) return "N/A";

                const date = new Date(profileData.dob);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();

                return `${day}/${month}/${year}`;
              })()}
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="mt-4 button-background-color text-white py-2 px-4 rounded-lg"
            >
              {isEditingProfile ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditingProfile && (
        <div className="max-w-4xl mx-auto border bg-gray-900 text-white  rounded-lg shadow-lg p-5 mt-5 personal-details-section fade-in">
          <h2 className="text-2xl font-bold mb-5 text-center">
            Edit Personal Details
          </h2>
          <form className="space-y-4" onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter User ID"
                  name="firstName"
                  onChange={handleProfileChange}
                  value={profileData.firstName}
                />
              </div>
              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Full Name"
                  name="lastName"
                  onChange={handleProfileChange}
                  value={profileData.lastName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg text-black"
                  name="email"
                  value={profileData.email}
                  disabled
                />
              </div>
              <div>
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg text-black"
                name="dob"
                value={profileData.dob}
                onChange={handleProfileChange}
              />
            </div>

            <button
              type="submit"
              className="button-background-color text-white py-2 px-4 rounded-lg w-full"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}



  


{/* Bank Details Section */}
      <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-5 bg-gray-900 text-white  mt-5 bank-details-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-lg font-semibold">Bank Name</h3>
            <div>{bankData.bankName}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Account Holder Name</h3>
            <div>{bankData.accountHolderName}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <h3 className="text-lg font-semibold">Account Number</h3>
            <div>{bankData.accountNumber}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">IFSC Code</h3>
            <div>{bankData.ifscCode}</div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setIsEditingBank(!isEditingBank)}
          className="mt-4 button-background-color text-white py-2 px-4 rounded-lg"
        >
          {isEditingBank ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Edit Bank Details Form */}
      {isEditingBank && (
        <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-5 bg-gray-900 text-white  mt-5 bank-details-section fade-in">
          <h2 className="text-2xl font-bold mb-5 text-center">
            Edit Bank Details
          </h2>
          <form className="space-y-4" onSubmit={handleBankUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium">Bank Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Bank Name"
                  name="bankName"
                  value={bankData.bankName}
                  onChange={handleBankChange}
                />
              </div>
              <div>
                <label className="block font-medium">Account Holder Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Account Holder Name"
                  name="accountHolderName"
                  value={bankData.accountHolderName}
                  onChange={handleBankChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium">Account Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Account Number"
                  name="accountNumber"
                  value={bankData.accountNumber}
                  onChange={handleBankChange}
                />
              </div>
              <div>
                <label className="block font-medium">IFSC Code</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter IFSC Code"
                  name="ifscCode"
                  value={bankData.ifscCode}
                  onChange={handleBankChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="submit"
                className="bg-[#181D8D] text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditingBank(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Binance Account Section */}
      <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-5 mt-5 bg-gray-900 text-white  binance-details-section fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Binance Account Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-lg font-semibold">Email Id</h3>
            <div>{binanceData.accountEmail}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Binance Address</h3>
            <div>{binanceData.walletAddress}</div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setIsEditingBinance(!isEditingBinance)}
          className="mt-4 button-background-color text-white py-2 px-4 rounded-lg"
        >
          {isEditingBinance ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Edit Binance Details Form */}
      {isEditingBinance && (
        <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-5 bg-gray-900 text-white  mt-5 binance-details-section fade-in">
          <h2 className="text-2xl font-bold mb-5 text-center">
            Edit Binance Details
          </h2>
          <form className="space-y-4" onSubmit={handleBinanceUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium">Binance Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Binance Name"
                  name="accountEmail"
                  value={binanceData.accountEmail}
                  onChange={handleBinanceChange}
                />
              </div>
              <div>
                <label className="block font-medium">Binance ID</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter Binance ID"
                  name="walletAddress"
                  value={binanceData.walletAddress}
                  onChange={handleBinanceChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="submit"
                className="bg-[#181D8D] py-2 px-4 rounded-lg text-black"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditingBinance(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminEditprofile;

      







