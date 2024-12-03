import React, { useEffect, useState } from 'react';
import { fetchAllUsers, approveUsers } from '../../services/api.service.js';
import Loader from '../../components/Loader'; // Assuming Loader is a custom component
import { toast } from 'react-toastify'; // For notifications

const Admin_Users = () => {
  const [users, setUsers] = useState([]); // To store user data
  const [loading, setLoading] = useState(true); // To handle loader state
  const [approving, setApproving] = useState(false); // Loader state for approving user
  const [rowIndex , setRowindex] =  useState('')

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchAllUsers()
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setUsers(res.data.users || []); // Update the state with fetched data
        } else {
          toast.error('Failed to fetch users.');
        }
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Stop loading even if there’s an error
        toast.error('Failed to fetch users.');
      });
  }, []);

  const handleApprove = async (userId , index) => {
    setRowindex(index)
    setApproving(true); // Show loader during the approval process
    try {
      await approveUsers(userId); // Call the API to approve the user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: 'approved' } : user
        )
      ); // Update the status locally
      toast.success('User approved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to approve user.');
    } finally {
      setApproving(false); // Hide loader after approval process
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">All Users</h1>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader size="6" color="white" />
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 text-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Name</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Email</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Phone</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Bank Details</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Binance Details</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Status</th>
                <th className="py-2 px-4 border-b border-gray-700 font-medium text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.userId}
                  className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}
                >
                  <td className="py-2 px-4 border-b border-gray-700">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.phone}</td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {user.bankDetails.bankName !== 'N/A' ? (
                      <>
                        {user.bankDetails.bankName}, {user.bankDetails.accountNumber}, {user.bankDetails.ifscCode}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {user.binanceDetails.walletAddress !== 'N/A' ? (
                      <>
                        {user.binanceDetails.walletAddress}, {user.binanceDetails.accountEmail}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        user.status === 'approved'
                          ? 'bg-green-800 text-green-400'
                          : 'bg-yellow-600 text-black-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                  <button
                        onClick={() => handleApprove(user.userId , index)}
                        className="bg-blue-700 w-full text-white px-3 py-2 rounded hover:bg-blue-800 focus:outline-none"
                        disabled={ user.status === "approved" ||approving}
                      >
                        {approving  && rowIndex === index  ? <Loader size="6" color="white" /> : 'Approve'}
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
