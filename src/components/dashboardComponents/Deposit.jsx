import React, { useState } from "react";

const Deposit = () => {
  const [depositMethod, setDepositMethod] = useState(""); // State for deposit method
  const [network, setNetwork] = useState(""); // State for USDT network
    


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center">Send Request</h1>

      {/* Left Side: Deposit Method */}
      <div className="w-full background-color shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Deposit Method</h2>
        
        {/* Dropdown for Deposit Method */}
        <select
          value={depositMethod}
          onChange={(e) => setDepositMethod(e.target.value)}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
        >
          <option value="">Transaction Type</option>
          {/* <option value="IndiaCash">India Cash</option> */}
          <option value="USDT">USDT</option>
        </select>

        {/* India Cash Form */}
        {depositMethod === "IndiaCash" && (
          <>
            <p className="font-medium text-sm mb-2">Important to know:</p>
            <div className="bg-yellow-100 p-4 rounded mb-4">
              <ul className="list-disc pl-5 text-gray-800">
                <li>Deposits via India Cash are processed instantly.</li>
                <li>Ensure you enter the correct amount for faster processing.</li>
                <li>
                  <strong className="text-red-500">Note:</strong> Transactions are non-reversible once processed.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <input
                  type="text"
                  value="INR"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deposit Amount (In ₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  required
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-4 text-center">
              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Confirm Your Request
              </button>
            </div>
          </>
        )}

        {/* USDT Form */}
        {depositMethod === "USDT" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Select Network
              </label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              >
                <option value="">Select Network</option>
                <option value="TRC20">Tether (TRC 20)</option>
                {/* <option value="BEP20">Tether (BEP 20)</option> */}
              </select>
            </div>

            <div className="bg-yellow-100 p-4 rounded mb-4">
              <p className="font-bold text-red-600">
                Important: Please verify the network before proceeding.
              </p>
              <ul className="list-disc pl-5 text-gray-800">
                <li>Ensure you select the correct network (TRC20 or BEP20).</li>
                <li>
                  Incorrect network selection may lead to loss of funds. Double-check your wallet address.
                </li>
                <li>Transactions are typically processed within 15 minutes.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <input
                  type="text"
                  value="USDT"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  USDT Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter USDT amount"
                  required
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-4 text-center">
              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Confirm Your Request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Deposit;