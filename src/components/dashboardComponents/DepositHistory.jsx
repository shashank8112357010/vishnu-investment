import React, { useState } from 'react';

const DepositHistory = () => {
  const [status, setStatus] = useState('Failed');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [image, setImage] = useState(null);

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSearch = () => {
    // Add your search functionality here
    console.log({ status, fromDate, toDate });
  };

  return (
    <div className="min-h-screen background-color border rounded-xl text-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl background-color p-6 rounded-xl mb-6 shadow-xl">
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
              <option value="Failed">Select Option</option>
              <option value="Failed">Failed</option>
              <option value="Complete">Complete</option>
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
      <div className="w-full max-w-6xl background-color p-6 rounded-xl shadow-xl mb-6">
       <h3 className="text-2xl font-bold mb-6 text-white">In USDT</h3>

        {/* USDT Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-4 border-b border-gray-500">Sr. No.</th>
                <th className="p-4 border-b border-gray-500">Request Date</th>
                <th className="p-4 border-b border-gray-500">Amount in USDT</th>
                <th className="p-4 border-b border-gray-500">Payable Amount in USDT</th>
                <th className="p-4 border-b border-gray-500">Request Id</th>
                <th className="p-4 border-b border-gray-500">Transaction Type</th>
                <th className="p-4 border-b border-gray-500">Network Type</th>
                <th className="p-4 border-b border-gray-500">Transaction Image</th>
                <th className="p-4 border-b border-gray-500">Transaction Id</th>
                <th className="p-4 border-b border-gray-500">Reason</th>
                <th className="p-4 border-b border-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* If no results found */}
              <tr className="text-center text-gray-400">
                <td className="p-4" colSpan="11">Result Not Found</td>
              </tr>

              {/* Example Data Row (replace with actual data) */}
              <tr className="bg-gray-700 text-white">
                <td className="p-4">1</td>
                <td className="p-4">10-09-2024</td>
                <td className="p-4">100 USDT</td>
                <td className="p-4">100 USDT</td>
                <td className="p-4">REQ654321</td>
                <td className="p-4">Credit</td>
                <td className="p-4">Ethereum</td>
                <td className="p-4">
                  <img src="example.jpg" alt="Transaction" className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="p-4">TXN987654</td>
                <td className="p-4">Transaction Complete</td>
                <td className="p-4">Complete</td>
              </tr>

              {/* Total Amount Row */}
              <tr className="bg-gray-700 text-white">
                <td className="p-4 font-bold border-t border-gray-500">Total Amount</td>
                <td className="p-4 border-t border-gray-500" colSpan="10">(0.00 USDT)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="w-full max-w-6xl background-color p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-white">Upload Transaction Image USDT</h3>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        />
        {image && (
          <div className="mt-4">
            <p className="text-white">Selected Image: {image.name}</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="mt-4 w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistory;