import React, { useState } from "react";
import { toast } from "react-toastify";
import { depositPayment } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { FaCopy } from "react-icons/fa";

const Deposit = () => {
  const [depositMethod, setDepositMethod] = useState(""); // Deposit method
  const [network, setNetwork] = useState(""); // USDT network
  const [amount, setAmount] = useState(""); // Amount
  const [step, setStep] = useState(1); // Form steps
  const [transactionImage, setTransactionImage] = useState(null); // Transaction image
  const [transactionId, setTransactionId] = useState(""); // Transaction ID
  const [loading, setLoading] = useState(false); // Loader state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const navigate = useNavigate();

  const validateFields = () => {
    // Step 1: Validate Deposit Method
    if (!depositMethod) {
      return "Please select a deposit method.";
    }

    // Step 2: Validate Network for USDT
    if (depositMethod === "USDT" && !network) {
      return "Please select a network.";
    }

    // Step 3: Validate Amount
    if (!amount || isNaN(amount)) {
      return "Amount must be a valid number.";
    }
    if (amount < 50 || amount > 350) {
      return "Amount must be between $50 and $350.";
    }

    // Step 4: Step-specific Validations
    if (step === 2) {
      if (!transactionImage) {
        return "Transaction image is required.";
      }

      // Validate File Type
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedImageTypes.includes(transactionImage.type)) {
        return "Only image files (JPG, PNG, GIF) are allowed.";
      }

      // Validate File Size
      const maxFileSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (transactionImage.size > maxFileSizeInBytes) {
        return "File size must not exceed 2 MB.";
      }

      if (!transactionId) {
        return "Transaction ID is required.";
      }
    }

    // No Errors
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const data = { amount, transactionId };
      await depositPayment(data, transactionImage);
      toast.success("Deposit request submitted. Pending admin approval.");
      navigate("/dashboard/deposithistory");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error submitting deposit request:", error);
    } finally {
      setLoading(false);
    }
  };

  // Copy text to clipboard
  const handleCopy = () => {
    const textToCopy = "TDf1MFkUTeyu5upSnZozprY8jhMtLQYL81";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => {
        toast.error("Failed to copy!");
        console.error("Error copying text:", err);
      });
  };

  return (
    <div className="flex w-full bg-gray-900 text-white flex-col items-start justify-start min-h-screen p-6 ">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
        Deposit
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full  bg-black shadow-lg p-6 rounded-lg"
      >
        {/* Step 1: Deposit Method */}
        {step === 1 && (
          <div className="">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Deposit Method
            </h2>
            <div className=" h-[40px]  w-full  bg-gray-800   border-[1px]  rounded-md border-double  inline-block relative">
              <select
                value={depositMethod}
                onChange={(e) => setDepositMethod(e.target.value)}
                onFocus={() => setIsOpen1(true)} 
                onBlur={() => setIsOpen1(false)} 
                className=" appearance-none w-full h-full  p-2  text-white  bg-transparent rounded      border-none pr-8"
              >
                <option value="" className="bg-gray-800">Transaction Type</option>
                <option value="USDT" className="bg-gray-800">USDT</option>
              </select>
              {/* Down Arrow */}
              <div className={`pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 ${isOpen1 ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </div>
            </div>

            {depositMethod === "USDT" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2  text-white">
                    Select Network
                  </label>

                  <div
                    className="h-[45px] w-full bg-gray-800 rounded-md border-[1px] border-double 
    inline-block relative"
                  >
                    {" "}
                    <select
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      onFocus={() => setIsOpen(true)} 
                       onBlur={() => setIsOpen(false)} 
                      className="w-full p-2 border border-gray-300 rounded text-white   appearance-none h-full bg-transparent border-none pr-8"
                    >
                      <option value="" className="bg-gray-800 text-white">Select Network</option>
                      <option value="TRC20" className="bg-gray-800 text-white">Tether (TRC20)</option>
                    </select>
                    {/* Down Arrow */}
                    <div
                      className={`pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500  ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                      ▼
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
                  <p className="font-semibold">Important:</p>
                  <ul className="list-disc pl-5">
                    <li>Ensure you select the correct network (TRC20).</li>
                    <li>
                      Incorrect network selection may lead to loss of funds.
                    </li>
                    <li>Transactions are processed within 15 minutes.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Currency
                    </label>
                    <input
                      type="text"
                      value="USDT"
                      disabled
                      className="w-full p-2 border border-gray-300 rounded  text-white bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      USDT Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 bg-gray-800 rounded text-white"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="w-full">
            <div className="p-4 border rounded mb-4">
              <h2 className="text-lg mb-2">Transfer to Address (TRC20):</h2>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded text-white">
                <span className="truncate ">
                  TDf1MFkUTeyu5upSnZozprY8jhMtLQYL81
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className=" hover:text-blue-600"
                >
                  <FaCopy title="Copy Text" />
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-column-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-white">
                  Transaction Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setTransactionImage(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 bg-gray-800 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-white">
                  Transaction ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-white bg-gray-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#01137F] text-white p-2 mt-6 rounded hover:bg-[#101C8E] flex items-center justify-center"
        >
          {loading ? (
            <Loader size="6" color="white" />
          ) : step === 1 ? (
            "Confirm Request"
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
