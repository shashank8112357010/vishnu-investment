import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchWithdrawalHistory } from "../../services/api.service.js"; // Replace with the actual service path
import Loader from "../../components/Loader.jsx";

const WithdrawalHistory = () => {
  // const [status, setStatus] = useState("");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);


  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Default dates
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState(formatDate(today)); // Default to today
  const [toDate, setToDate] = useState(formatDate(nextDay));   // Default to next day

  useEffect(() => {
    loadHistory();
  }, []);

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const response = await fetchWithdrawalHistory();
      setHistoryData(response.data?.data || []);
      setFilteredData(response.data?.data || []); // Default to all data
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
      toast.error("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = historyData.filter((item) => {
      const itemDate = new Date(item?.requestedAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      return (
        (!status || item.status === status) &&
        (!from || itemDate >= from) &&
        (!to || itemDate <= to)
      );
    });

    setFilteredData(filtered);
    if (filtered.length === 0) {
      toast.info("No records found .");
    }
  };

  const clearFilters = () => {
    setStatus("");
    setFromDate("");
    setToDate("");
    setFilteredData(historyData); // Reset to original data
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Withdrawal History</h2>
        <div className="flex flex-wrap items-center gap-4">
          <select
            className="bg-gray-700 w-full md:w-[160px] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <input
            type="date"
            className="bg-gray-700 w-full md:w-auto text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fromDate}
            onChange={handleFromDateChange}
          />
          <input
            type="date"
            className="bg-gray-700 w-full md:w-auto text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toDate}
            onChange={handleToDateChange}
          />


          <button
            onClick={handleSearch}
            className="bg-[#0d1b87] px-3 hover:bg-[#1c2fbc] w-full md:w-auto hover:bg-blue-700 text-white font-semibold p-2 rounded-md transition duration-300"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="bg-[#0d1b87] px-3  hover:bg-[#1c2fbc] w-full md:w-auto hover:bg-gray-700 text-white font-semibold p-2 rounded-md transition duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-4 border-b border-gray-600">Sr. No.</th>
                <th className="p-4 border-b border-gray-600">Withdrawal Method</th>
                <th className="p-4 border-b border-gray-600">Amount</th>
                <th className="p-4 border-b border-gray-600">Request Date</th>
                <th className="p-4 border-b border-gray-600">Approved Date</th>
                <th className="p-4 border-b border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    <Loader color={"white"} size="6" />
                  </td>
                </tr>
              ) : filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-700 transition">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{item.withdrawalMethod}</td>
                    <td className="p-4">{item.amount}</td>
                    <td className="p-4">
                      {item?.requestedAt
                        ? new Date(item?.requestedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      {item?.approvedAt
                        ? new Date(item?.approvedAt).toLocaleDateString()
                        : "N/A"}
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
