import React, { useState } from "react";

const DepositHistory = () => {
  // const [status, setStatus] = useState("Failed");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  // const [image, setImage] = useState(null);

  // const handleStatusChange = (e) => setStatus(e.target.value);
  // const handleFromDateChange = (e) => setFromDate(e.target.value);
  // const handleToDateChange = (e) => setToDate(e.target.value);
  // const handleImageChange = (e) => setImage(e.target.files[0]);

  // const handleSearch = () => {
  //   // Add your search functionality here
  //   console.log({ status, fromDate, toDate });
  // };

    // let tableHeadingData=['Id','A/c Number','Amount','Status']
    let tableData=[
      {
        id:'1',
        acNumber:'123456789',
        amount:1234567890,
        status:'Done'
      },
      {
        id:'1',
        acNumber:'123456789',
        amount:1234567890,
        status:'Failed'
      }
    ]
    // let status=false
  return (
    <div className="h-auto background-color border rounded-xl text-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl background-color p-6 rounded-xl mb-6 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Request History</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Select Status */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">
              Select Status
            </label>
            <select
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              
            
            >
              <option value="Failed">Select Option</option>
              <option value="Failed">Failed</option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* From Date */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">
              From Date
            </label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              
            />
          </div>

          {/* To Date */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-400">
              To Date
            </label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
          </div>

          {/* Search Button */}
          <div className="flex-1">
            <button
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
        <table className="w-full">
          <tr>
           {/* {tableHeadingData.map((item)=>( <th>{item}</th>))} */}
           <th>Id</th>
           <th>A/c Number</th>
           <th>Amount</th>
           <th>Status</th>
          </tr>
          {tableData && tableData.length > 0 ? (
    tableData.map((item, index) => (
      <tr key={index}>
        <td>{item?.id}</td>
        <td>{item?.acNumber}</td>
        <td>{item?.amount}</td>
        <td
          className={
            item?.status === "Done"
              ? "text-green-800 bg-green-400 inline px-2 py-[2px] rounded"
              : "text-red-800 bg-red-400 rounded inline px-2 py-[2px]"
          }
        >
          {item.status}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center text-gray-500 py-4">
        No data available
      </td>
    </tr>
  )}
        </table>
      </div>
    </div>
  );
};

export default DepositHistory;
