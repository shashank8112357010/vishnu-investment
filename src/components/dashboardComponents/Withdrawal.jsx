import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitWithdrawalRequest } from "../../services/api.service"; // Adjust path to your service file
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
  const [withdrawalMethod, setTransactionType] = useState("");
  const [amountINR, setAmountINR] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate the form fields
  const validateFields = () => {
    if (!withdrawalMethod) return "Please select a transaction type.";
    if (withdrawalMethod === "Bank_Account" && !amountINR)
      return "Please enter an amount in INR.";
    if (withdrawalMethod === "Binance_Account") {
      if (!network) return "Please select a network for Binance.";
      if (!amountUSD) return "Please enter an amount in USD.";
    }

    const amount = withdrawalMethod === "Bank_Account" ? amountINR : amountUSD;
    if (amount < 3) return "Amount must be at least $3.";
    if (amount > 350) return "Amount cannot exceed $350.";

    return ""; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      toast.error(validationError); // Show error notification
    } else {
      const requestData = {
        withdrawalMethod,
        amount: withdrawalMethod === "Bank_Account" ? amountINR : amountUSD,
        ...(withdrawalMethod === "Binance_Account" && { network }),
      };

      setLoading(true); // Set loading state
      try {
        const response = await submitWithdrawalRequest(requestData); // Call API service
        toast.success(response.message || "Request submitted successfully!");
        navigate("/dashboard/withdrawalhistory");
      } catch (error) {
        console.error("Error submitting withdrawal request:", error);
        toast.error(
          error.response?.data?.message || "Failed to submit request. Try again!"
        );
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleTransactionChange = (e) => {
    setTransactionType(e.target.value);
    setAmountINR("");
    setAmountUSD("");
    setNetwork("");
  };

  return (
       <>
        <div className="flex justify-start items-start flex-col  min-h-screen bg-gray-900 text-white border rounded-xl p-4">
    <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
      Withdrawal Request
        </h1>
      <div className="border text-white p-8 rounded-lg shadow-lg w-full bg-black">
       

        {/* Transaction Type Dropdown */}
        <select
          className="w-full text-sm md:text-lg  bg-gray-900 text-white p-3 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={withdrawalMethod}
          onChange={handleTransactionChange}
        >
          <option value="">Select Transaction Type</option>
          <option value="Bank_Account">Bank Account</option>
          <option value="Binance_Account">Binance Account</option>
        </select>

        {/* Bank Account Form */}
        {withdrawalMethod === "Bank_Account" && (
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
        {withdrawalMethod === "Binance_Account" && (
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
          disabled={loading} // Disable button during loading
          className={`  w-full py-3 rounded transition duration-300 ease-in-out ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#0d1b87]  hover:bg-[#1c2fbc] text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Confirm Your Request"
          )}
        </button>
      </div>
    </div>
       
       </>
  );
};

export default Withdrawal;
