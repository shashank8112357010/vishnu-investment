import React, { useEffect, useState } from "react";
import { getDepositHistory } from "../../services/api.service";

const AdminDepositHistory = () => {
  const [depositHistory, setDepositHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDepositHistory()
      .then((res) => {
        setDepositHistory(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deposit history:", err);
        setError("Failed to load deposit history.");
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    // Add your API call or logic here
  };

  const handleReject = (id) => {
    // Add your API call or logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      {/* Header */}
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
        Deposit History
      </h1>
     

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-lg text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      ) : depositHistory.length > 0 ? (
        <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <caption className="text-left mb-4 text-lg font-semibold text-white">
                Deposit Records
              </caption>
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 border-b">ID</th>
                  <th className="p-4 border-b">Date</th>
                  <th className="p-4 border-b">Amount</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                    } text-white`}
                  >
                    <td className="p-4">{item?.transactionId || "N/A"}</td>
                    <td className="p-4">
                      {item?.date ? new Date(item?.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4">₹{item?.amount || "0.00"}</td>
                    <td
                      className={`p-4 ${
                        item?.status === "approved"
                          ? "text-green-500"
                          : item?.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {item?.status || "Unknown"}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(item.transactionId)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.transactionId)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-700">
                  <td colSpan="3" className="p-4 font-bold text-white">
                    Total Amount
                  </td>
                  <td colSpan="2" className="p-4 text-right">
                    ₹
                    {depositHistory
                      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No deposit history available.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDepositHistory;
