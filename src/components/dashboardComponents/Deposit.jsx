import React, { useState } from "react";
import { toast } from "react-toastify";

const Deposit = () => {
  const [depositMethod, setDepositMethod] = useState(""); // State for deposit method
  const [network, setNetwork] = useState(""); // State for USDT network
  const [amount, setAmount] = useState(""); // State for USDT amount
  const [step, setStep] = useState(1); // Step to control form steps
  const [transactionImage, setTransactionImage] = useState(null); // For image upload
  const [transactionId, setTransactionId] = useState(""); // For transaction ID

  // Validate form fields
  const validateFields = () => {
    if (!depositMethod) return "Please select a deposit method.";
    if (depositMethod === "USDT" && !network)
      return "Please select a network for USDT.";
    if (!amount) return "Amount is required.";
    if (isNaN(amount)) return "Amount must be a number.";
    if (amount < 3) return "Amount must be at least $3.";
    if (amount > 350) return "Amount cannot exceed $350.";
    if (step === 2 && !transactionImage) return "Please upload a transaction image.";
    if (step === 2 && !transactionId) return "Please provide a transaction ID.";
    return ""; // No errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      toast.error(validationError); // Show error notification
    } else {
      if (step === 1) {
        setStep(2); // Move to the next step
      } else if (step === 2) {
        toast.success("Request submitted successfully!"); // Show success notification
        console.log({
          depositMethod,
          network,
          amount,
          transactionImage,
          transactionId,
        }); // Log all data to console
      }
    }
  };

  const handleCopy = () => {
    const textToCopy = "Binance Id"; // Replace this with the actual address or ID to copy

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        toast.success("Copied to clipboard!"); // Show success notification
      },
      (err) => {
        toast.error("Failed to copy!"); // Show error notification
        console.error("Error copying text: ", err);
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center">Send Request</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className=" w-full background-color shadow-md p-6 rounded-lg"
      >
        {/* Step 1: Deposit Method */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Deposit Method</h2>
            <select
              value={depositMethod}
              onChange={(e) => setDepositMethod(e.target.value)}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            >
              <option value="">Transaction Type</option>
              <option value="USDT">USDT</option>
            </select>

            {/* USDT Network Selection */}
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
              </>
            )}
          </>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="w-full">
            <div className="border inline-block  p-3 rounded">
              <h1 className="text-xl">Transfer On Below Address TRC20</h1>
              <div className="text-lg border mt-2 rounded-xl pl-2 relative overflow-hidden">
                <p className="w-[250px] h-5 overflow-hidden inline-block">
                  Binance Id Binance Id Binance Id Binance Id Binance Id Binance Id
                </p>
                <span
                  className="absolute right-0 bg-black px-2 cursor-pointer"
                  onClick={handleCopy}
                >
                  Copy
                </span>
              </div>
            </div>
            <div className="flex mt-4 gap-5">
              <div className="w-full">
                <label htmlFor="" className="mb-1">Transaction Image</label><br />
                <input
                  type="file"
                  onChange={(e) => setTransactionImage(e.target.files[0])}
                  className="bg-gray-600 w-full py-2 px-2 rounded border border-white"
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="mb-1">Transaction ID</label><br />
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-white text-black text-lg w-full py-2 px-2 rounded border border-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {step === 1 ? "Confirm Your Request" : "Submit Your Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
