import React, { useState } from "react";

const AdminWithdrawalHistory = () => {
  const [status, setStatus] = useState("Failed");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);

  const handleSearch = () => {
    console.log({ status, fromDate, toDate });
  };

  const handleApprove = (id) => {
    console.log(`Approved withdrawal with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected withdrawal with ID: ${id}`);
  };

  const tableData = [
    {
      id: "1",
      withdrawalMethod: "Bank Account",
      amount: "12345",
      requestData: "01/01/2024",
      approvedDate: "02/01/2024",
      status: "Approved",
    },
    {
      id: "2",
      withdrawalMethod: "Bank Account",
      amount: "67890",
      requestData: "03/01/2024",
      approvedDate: "",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 p-6 rounded-lg mb-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Request History</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Select Status</label>
            <select
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring focus:ring-gray-500"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">From Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring focus:ring-gray-500"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">To Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring focus:ring-gray-500"
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-4 border-b">Sr. No.</th>
                <th className="p-4 border-b">Withdrawal Method</th>
                <th className="p-4 border-b">Amount</th>
                <th className="p-4 border-b">Request Date</th>
                <th className="p-4 border-b">Approved Date</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                    } text-white`}
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.withdrawalMethod}</td>
                    <td className="p-4">₹{item.amount}</td>
                    <td className="p-4">{item.requestData}</td>
                    <td className="p-4">
                      {item.approvedDate || "Not Approved"}
                    </td>
                    <td
                      className={`p-4 ${
                        item.status === "Approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      } font-semibold`}
                    >
                      {item.status}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-700">
                <td colSpan="3" className="p-4 font-bold text-white">
                  Total Amount
                </td>
                <td colSpan="4" className="p-4 text-right">
                  ₹{tableData.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalHistory;
