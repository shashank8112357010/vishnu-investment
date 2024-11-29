import React, { useState } from "react";
import { toast } from "react-toastify";


const Withdrawal = () => {
  const [transactionType, setTransactionType] = useState("");
  const [amountINR, setAmountINR] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [network, setNetwork] = useState("");

  // Validate the form fields
  const validateFields = () => {
    if (!transactionType) return "Please select a transaction type.";
    if (transactionType === "Bank_Account" && !amountINR)
      return "Please enter an amount in INR.";
    if (transactionType === "Binance_Account") {
      if (!network) return "Please select a network for Binance.";
      if (!amountUSD) return "Please enter an amount in USD.";
    }

    const amount = transactionType === "Bank_Account" ? amountINR : amountUSD;
    if (amount < 3) return "Amount must be at least $3.";
    if (amount > 350) return "Amount cannot exceed $350.";

    return ""; // No errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      toast.error(validationError); // Show error notification
    } else {
      const requestData = {
        transactionType,
        amount: transactionType === "Bank_Account" ? amountINR : amountUSD,
        ...(transactionType === "Binance_Account" && { network }),
      };
      console.log("Request Data:", requestData); // Log data to the console
      toast.success("Request submitted successfully!");
    }
  };

  const handleTransactionChange = (e) => {
    setTransactionType(e.target.value);
    setAmountINR("");
    setAmountUSD("");
    setNetwork("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen background-color border rounded-xl p-4">
      <div className="background-color border text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Withdrawal Method</h2>

        {/* Transaction Type Dropdown */}
        <select
          className="w-full bg-gray-900 text-white p-3 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={transactionType}
          onChange={handleTransactionChange}
        >
          <option value="">Select Transaction Type</option>
          <option value="Bank_Account">Bank Account</option>
          <option value="Binance_Account">Binance Account</option>
        </select>

        {/* Bank Account Form */}
        {transactionType === "Bank_Account" && (
          <div className="bg-gray-700 p-6 rounded mb-4">
            <h3 className="text-xl mb-4 text-red-600">Important to Know</h3>
            <p className="text-sm mb-2">Minimum Withdrawal Amount: (3$).</p>
            <p className="text-sm mb-2">Maximum Withdrawal Amount: (350$).</p>
            <p className="text-sm mb-4">Requests are processed within 24 hours.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Withdrawal Amount in INR (₹)
              </label>
              <input
                type="number"
                value={amountINR}
                onChange={(e) => setAmountINR(e.target.value)}
                placeholder="Enter amount in INR"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>
          </div>
        )}

        {/* Binance Account Form */}
        {transactionType === "Binance_Account" && (
          <div className="bg-gray-700 p-6 rounded mb-4">
            <h3 className="text-xl mb-4 text-red-500">Important to know</h3>
            <p className="text-sm mb-2">Minimum Withdrawal Amount: (3$).</p>
            <p className="text-sm mb-2">Maximum Withdrawal Amount: (350$).</p>
            <p className="text-sm mb-4">Requests are processed within 24 hours.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Network</label>
              <select
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option value="">Select Network</option>
                <option value="TRC20">USDT Tether Tron (TRC-20)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Amount in USD
              </label>
              <input
                type="number"
                value={amountUSD}
                onChange={(e) => setAmountUSD(e.target.value)}
                placeholder="Enter amount in USD"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition duration-300 ease-in-out"
        >
          Confirm Your Request
        </button>
      </div>

    </div>
  );
};

export default Withdrawal;
