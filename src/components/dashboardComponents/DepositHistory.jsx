import React, { useEffect, useState } from "react";
import { getDepositHistory } from "../../services/api.service";

const DepositHistory = () => {
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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
      deposit history
        </h1>
     

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-lg text-gray-600">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        ) : depositHistory.length > 0 ? (
          <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-800 text-white">
                  <tr className="bg-gray-700 text-white">
                    {["ID", "Date", "Amount", "Status"].map((item, index) => (
                      <th
                        key={index}
                        className="py-3 font-small px-4 text-left uppercase"
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
                      // className=""
                      className={"text-white hover:bg-gray-700 transition"}
                    >
                      <td className="py-3 px-4 text-sm text-white-700">
                        {item?.transactionId || "N/A"}
                      </td>
                      <td className="p-4">
                        {item?.date
                          ? new Date(item?.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-4">
                        ${item?.amount || "0.00"}
                      </td>
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
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">No deposit history available.</p>
          </div>
        )}
     
    </div>
  );
};

export default DepositHistory;
