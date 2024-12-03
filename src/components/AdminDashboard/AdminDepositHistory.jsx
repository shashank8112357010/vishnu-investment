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

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white-800 mb-8">Deposit History</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-lg text-gray-600">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        ) : depositHistory.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {["ID", "Date", "Amount", "Status"].map((item, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50 " : "bg-white "}border-t-2 `}
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">{item?.transactionId || "N/A"}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item?.date ? new Date(item?.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">${item?.amount || "0.00"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded ${
                          item?.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : item?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item?.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">No deposit history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDepositHistory;
