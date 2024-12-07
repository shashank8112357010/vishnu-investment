import React, { useEffect, useState } from "react";
import { fetchAllUsers, approveUsers, deleteUserByAdmin, payToUserByAdmin } from "../../services/api.service.js";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Admin_Users = () => {
  const [users, setUsers] = useState([]); // All user data
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered user data
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [rowIndex, setRowIndex] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Modal State
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  
  const [isBankDetail, setIsBankDetail] = useState(false);
  
  
  const [isBinanceDetail, setIsBinanceDetail] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllUsers();
      if (res.data.success) {
        const usersData = res.data.users || [];
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filtered users
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, index) => {
    setRowIndex(index);
    setApproving(true);
    try {
      await approveUsers(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: "approved" } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: "approved" } : user
        )
      );
      toast.success("User approved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve user.");
    } finally {
      setApproving(false);
    }
  };

  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        (!status || user.status === status) &&
        (!fromDate || new Date(user.createdAt) >= new Date(fromDate)) &&
        (!toDate || new Date(user.createdAt) <= new Date(toDate))
    );
    setFilteredUsers(filtered);
  };

  const handleClearFilters = () => {
    setStatus("");
    setFromDate("");
    setToDate("");
    setSearchQuery("");
    setFilteredUsers(users);
  };

 







  const handleDelete = async (userId) => {
    try {
      await deleteUserByAdmin(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  };

  const handleOpenPayModal = (user) => {
    setSelectedUser(user);
    setIsPayModalOpen(true);
  };
  const handleBankDetail = (user) => {
    // console.log(user);

    
    setSelectedUser(user);
    setIsBankDetail(true);
  };



  const handleBinanceDetail = (user) => {
    // console.log(user)
    setSelectedUser(user);
    setIsBinanceDetail(true);
  };

  const handlePaySubmit = async () => {
    try {
      if (!depositAmount) {
        toast.error("Please enter a deposit amount.");
        return;
      }
      await payToUserByAdmin(selectedUser.userId, depositAmount);
      toast.success("Payment submitted successfully!");
      setDepositAmount("");
      setIsPayModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit payment.");
    }
  };



  return (
    <div className="p-4 bg-gray-900 text-gray-200 min-h-screen">
   {isPayModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
    style={{ animation: "fadeIn 0.3s ease-in-out" }}
  >
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm transform transition-transform duration-300 ease-in-out"
      style={{ animation: "slideUp 0.3s ease-in-out" }}
    >
      <h2 className="text-lg font-bold text-white mb-4">
        Deposit Amount for {selectedUser.firstName} {selectedUser.lastName}
      </h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg mb-4 focus:ring focus:ring-gray-500"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsPayModalOpen(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handlePaySubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}
   {isBankDetail && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
    style={{ animation: "fadeIn 0.3s ease-in-out" }}
  >
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm transform transition-transform duration-300 ease-in-out"
      style={{ animation: "slideUp 0.3s ease-in-out" }}
    >
      <h2 className="text-lg font-bold text-white mb-4">
        Bank Dtails for {selectedUser.firstName} {selectedUser.lastName}
      </h2>
    
      <div className="flex justify-end flex-col gap-2">
        {/* {console.log(selectedUser , "selectedUser")}\ */}
        <p>Holder Name : {selectedUser.bankDetails?.accountHolderName}</p>
        <p>Account No : {selectedUser.bankDetails?.accountNumber}</p>
        <p>Bank Name : {selectedUser.bankDetails?.bankName}</p>
        <p>IFSC Code : {selectedUser.bankDetails?.ifscCode}</p>
        <span>{selectedUser && selectedUser.bankDetails?.accountHolderName.includes('N/A') && "No details"}</span>
        <button
          onClick={() => setIsBankDetail(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
       
      </div>
    </div>
  </div>
)}
   {isBinanceDetail && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
    style={{ animation: "fadeIn 0.3s ease-in-out" }}
  >
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm transform transition-transform duration-300 ease-in-out"
      style={{ animation: "slideUp 0.3s ease-in-out" }}
    >
      <h2 className="text-lg font-bold text-white mb-4">
        Binance Dtails for {selectedUser.firstName} {selectedUser.lastName}
      </h2>
    
      <div className="flex justify-end flex-col gap-2">
        {/* {console.log(selectedUser , "selectedUser")}\ */}
        <p>Account Email : {selectedUser.binanceDetails?.accountEmail}</p>
        <p>Wallet Address : {selectedUser.binanceDetails?.walletAddress}</p>
        <span>{selectedUser && selectedUser.binanceDetails?.accountEmail.includes('N/A') && "No details"}</span>
        <button
          onClick={() => setIsBinanceDetail(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
       
      </div>
    </div>
  </div>
)}

      <div className="flex justify-between items-center gap-2">
        <h1 className=" px-1 md:px-3 py-2 mb-3 bg-gray-400 text-[10px] md:text-[16px] inline-block rounded-md text-black font-bold uppercase">
          All Users
        </h1>
        <input
          type="search"
          placeholder="Search by Name / Email"
          className=" w-44 md:w-64 bg-gray-800 text-white text-[10px] md:text-[16px] p-2 rounded-lg focus:ring focus:ring-gray-500 px-3 py-2 mb-3 "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>

      {/* Filters Section */}
      <div className="w-full max-w-7xl p-3 bg-gray-800 border border-gray-700 md:p-4 rounded-lg mb-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <label className="block mb-1 text-[12px] md:text-[16px] font-medium">Status</label>
            <select
              className="w-full bg-gray-700 text-white p-2 text-[12px] md:text-[16px] rounded-lg focus:ring focus:ring-gray-500"
              value={status}
              onChange={(e) => setStatus(e.target.value.toLowerCase())}
            >
              <option value="" className="text-[13px]">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[12px] md:text-[16px]">From Date</label>
            <input
              type="date"
              className="w-full text-[12px] md:text-[16px] bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[12px] md:text-[16px]">To Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-[12px] md:text-[16px] text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate} // Disable dates before fromDate
            />
          </div>
          <div className="flex items-end gap-2 justify-start">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition text-[12px] md:text-[14px]"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-500 text-[12px] md:text-[14px] hover:bg-gray-600 text-white font-semibold p-2  rounded-lg transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader size="6" color="white" />
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 border-b font-medium text-left">Name</th>
                <th className="py-2 px-4 border-b font-medium text-left">Email</th>
                <th className="py-2 px-4 border-b font-medium text-left">Phone</th>
                <th className="py-2 px-4 border-b font-medium text-left">Bank Details</th>
                <th className="py-2 px-4 border-b font-medium text-left">Binance Details</th>
                <th className="py-2 px-4 border-b font-medium text-left">Status</th>
                <th className="py-2 px-4 border-b font-medium text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.filter(
                (item) =>
                  item.firstName.toLowerCase().includes(searchQuery) ||
                  item.email.toLowerCase().includes(searchQuery)
              ).map((user, index) => (
                <tr
                  key={user.userId}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                >
                  <td className="py-2 px-4 border-b">{user.firstName} {user.lastName}</td>
                  <td className="py-2 px-4 border-b" title={user.email}>{user.email.slice(0, 20)}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b cursor-pointer" onClick={() => handleBankDetail(user)} >
                    {user.bankDetails.bankName !== "N/A"
                      ? `${user.bankDetails.bankName}, ${user.bankDetails.accountNumber}, ${user.bankDetails.ifscCode}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b cursor-pointer"  onClick={() => handleBinanceDetail(user)} >
                    {user.binanceDetails.walletAddress !== "N/A"
                      ? `${user.binanceDetails.walletAddress}, ${user.binanceDetails.accountEmail}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-sm rounded ${user.status === "approved"
                        ? "bg-green-800 text-green-400"
                        : "bg-yellow-600 text-black-400"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.status === "approved" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(user.userId)}
                          className="bg-red-600 w-full text-white px-2 py-1 text-sm rounded hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleOpenPayModal(user)}
                          className="bg-green-600 w-full text-white px-2 py-1 text-sm rounded hover:bg-green-700 focus:outline-none"
                        >
                          Pay
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApprove(user.userId)}
                        className="bg-blue-700 w-full text-white px-2 py-1 text-sm rounded hover:bg-blue-800 focus:outline-none"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.filter(
                (item) =>
                  item.firstName.toLowerCase().includes(searchQuery) ||
                  item.email.toLowerCase().includes(searchQuery)
              ).length === 0 && (
                  <tr className="text-center p-5">
                    <td colSpan={7} className="py-5">
                      No users found matching "{searchQuery}".
                    </td>
                  </tr>
                )}
            </tbody>


          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};







export default Admin_Users;
