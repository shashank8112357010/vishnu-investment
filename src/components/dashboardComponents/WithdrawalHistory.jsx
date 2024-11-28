import React, { useState } from 'react';

const WithdrawalHistory= () => {
  const [status, setStatus] = useState('Failed');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);

  const handleSearch = () => {
    // Add your search functionality here
    console.log({ status, fromDate, toDate });
  };

  return (
    <div className="min-h-screen background-color border rounded-xl text-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-7xl background-color border  p-6 rounded-xl mb-6 shadow-xl mt-10">
        <h2 className="text-3xl font-bold mb-6 text-white">Request History</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Select Status */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">Select Status</label>
            <select
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              value={status}
              onChange={handleStatusChange}
            >
                <option value="Select"> Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* From Date */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">From Date</label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>

          {/* To Date */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">To Date</label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>

          {/* Search Button */}
          <div className="flex-1">
            <button
              onClick={handleSearch}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold p-3 rounded-lg transition duration-300 shadow-lg mt-8"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-7xl background-color border rounded-xl p-6  shadow-xl">

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg- text-white">
                <th className="p-4 border-b border-gray-500">Sr. No.</th>
                <th className="p-4 border-b border-gray-500">Payment type</th>
                <th className="p-4 border-b border-gray-500">Withdrawal Method</th>
                <th className="p-4 border-b border-gray-500">Amount$</th>
                <th className="p-4 border-b border-gray-500">Charges</th>
                <th className="p-4 border-b border-gray-500">Withdrable $</th>
                <th className="p-4 border-b border-gray-500">Request Date</th>
                <th className="p-4 border-b border-gray-500">Approved Date</th>
                <th className="p-4 border-b border-gray-500">Reason</th>
                <th className="p-4 border-b border-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* If no results found */}
              <tr className="text-center text-gray-400">
                <td className="p-4" colSpan="1">Result Not Found</td>
              </tr>

              {/* Total Amount Row */}
              <tr className="bg-gray-700 text-white">
                <td className="p-4 font-bold border-t border-gray-500">Total Amount</td>
                <td className="p-4 border-t border-gray-500" colSpan="9">(0.00 ₹) </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistory;