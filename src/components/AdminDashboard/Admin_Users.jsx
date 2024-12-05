import React, { useEffect, useState } from "react";
import { fetchAllUsers, approveUsers } from "../../services/api.service.js";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Admin_Users = () => {
  const [users, setUsers] = useState([]); // All user data
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered user data
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [rowIndex, setRowIndex] = useState("");

  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
    setFilteredUsers(users);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md text-black font-bold uppercase">
        All Users
      </h1>

      {/* Filters Section */}
      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={status}
              onChange={(e) => setStatus(e.target.value.toLowerCase())}
            >
              <option value="">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">From Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">To Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate} // Disable dates before fromDate
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold p-2 rounded-lg transition"
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
                <th className="py-2 px-4 border-b font-medium text-left">
                  Bank Details
                </th>
                <th className="py-2 px-4 border-b font-medium text-left">
                  Binance Details
                </th>
                <th className="py-2 px-4 border-b font-medium text-left">Status</th>
                <th className="py-2 px-4 border-b font-medium text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.userId}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                >
                  <td className="py-2 px-4 border-b">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {user.bankDetails.bankName !== "N/A" ? (
                      <>
                        {user.bankDetails.bankName}, {user.bankDetails.accountNumber},{" "}
                        {user.bankDetails.ifscCode}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.binanceDetails.walletAddress !== "N/A" ? (
                      <>
                        {user.binanceDetails.walletAddress},{" "}
                        {user.binanceDetails.accountEmail}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        user.status === "approved"
                          ? "bg-green-800 text-green-400"
                          : "bg-yellow-600 text-black-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleApprove(user.userId, index)}
                      className="bg-blue-700 w-full text-white px-3 py-2 rounded hover:bg-blue-800 focus:outline-none"
                      disabled={user.status === "approved" || approving}
                    >
                      {approving && rowIndex === index ? (
                        <Loader size="6" color="white" />
                      ) : (
                        "Approve"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
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
