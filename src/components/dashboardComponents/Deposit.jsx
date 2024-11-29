import React, { useState } from "react";
import { toast } from "react-toastify";


const Deposit = () => {
  const [depositMethod, setDepositMethod] = useState(""); // State for deposit method
  const [network, setNetwork] = useState(""); // State for USDT network
  const [amount, setAmount] = useState(""); // State for USDT amount

  // Validate form fields
  const validateFields = () => {
    if (!depositMethod) return "Please select a deposit method.";
    if (depositMethod === "USDT" && !network)
      return "Please select a network for USDT.";
    if (!amount) return "Amount is required.";
    if (isNaN(amount)) return "Amount must be a number.";
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
      toast.success("Request submitted successfully!"); // Show success notification
      console.log({
        depositMethod,
        network: depositMethod === "USDT" ? network : "N/A",
        amount,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center">Send Request</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full background-color shadow-md p-6 rounded-lg"
      >
        {/* Deposit Method */}
        <h2 className="text-xl font-semibold mb-4">Deposit Method</h2>
        <select
          value={depositMethod}
          onChange={(e) => setDepositMethod(e.target.value)}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
        >
          <option value="">Transaction Type</option>
          <option value="USDT">USDT</option>
        </select>

        {/* USDT Form */}
        {depositMethod === "USDT" && (
          <>
            {/* Select Network */}
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
              </select>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-100 p-4 rounded mb-4">
              <p className="font-bold text-red-600">
                Important: Please verify the network before proceeding.
              </p>
              <ul className="list-disc pl-5 text-gray-800">
                <li>Ensure you select the correct network (TRC20).</li>
                <li>
                  Incorrect network selection may lead to loss of funds.
                  Double-check your wallet address.
                </li>
                <li>Transactions are typically processed within 15 minutes.</li>
              </ul>
            </div>

            {/* Amount Section */}
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter USDT amount"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Confirm Your Request
              </button>
            </div>
          </>
        )}
      </form>

      {/* Toast Container */}
     
    </div>
  );
};

export default Deposit;
