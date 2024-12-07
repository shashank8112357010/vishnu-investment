import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchWithdrawalHistory } from "../../services/api.service.js"; // Replace with the actual service path
import Loader from "../../components/Loader.jsx";

const WithdrawalHistoryForm = () => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the data for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
      toast.info("No records found.");
    }
    setCurrentPage(1); // Reset to first page after search
  };

  const clearFilters = () => {
    setStatus("");
    setFromDate("");
    setToDate("");
    setFilteredData(historyData); // Reset to original data
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      {/* Header */}
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
        Withdrawal History
      </h1>
      <div className="w-full max-w-7xl bg-black border border-gray-700 p-4 rounded-lg shadow-lg mb-8">
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
            className="bg-[#0d1b87] px-3 hover:bg-[#1c2fbc] w-full md:w-auto text-white font-semibold p-2 rounded-md transition duration-300"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="bg-[#0d1b87] px-3 hover:bg-[#1c2fbc] w-full md:w-auto text-white font-semibold p-2 rounded-md transition duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-7xl bg-black border border-gray-700 rounded-lg p-6 shadow-lg">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-[#333] text-white">
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
              ) : currentRows && currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={item._id} className="hover:bg-[#444] border-b transition">
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
                        className={`text-sm font-medium px-2 py-1 rounded ${item?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : item?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"}`}
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

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-[#0d1b87] text-white p-2 rounded-md disabled:bg-gray-600"
          >
            Previous
          </button>
          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-[#0d1b87] text-white p-2 rounded-md disabled:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistoryForm;
