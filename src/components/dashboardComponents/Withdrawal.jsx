import React, { useState } from 'react';

const Withdrawal = () => {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionChange = (e) => {
    setTransactionType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen background-color border rounded-xl p-4">
      <div className="background-color border  text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Withdrawal Method</h2>

        {/* Transaction Type Dropdown */}
        <select
          className="w-full bg-gray-900 text-white p-3 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={transactionType}
          onChange={handleTransactionChange}
        >
          <option value="">Select Transaction Type</option>
          <option value="INDIAN_CASE">Indian Cash</option>
          <option value="USDT">USDT Cash</option>
        </select>

        {/* INDIAN CASE Form */}
        {transactionType === 'INDIAN_CASE' && (
          <div className="bg-gray-700 p-6 rounded mb-4">
            <h3 className="text-xl mb-4 text-red-600">Important to Know</h3>
            <p className="text-sm mb-2">Minimum Withdrawal Amount: ₹800 (10$).</p>
            <p className="text-sm mb-2">Requests are processed within 24 hours Monday to Friday.</p>
            <p className="text-sm mb-4">Requests made on Saturday and Sunday will be processed on Monday morning.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount in USD</label>
              <input
                type="text" 
                value="Withdrawal Amount"
                readOnly
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Withdrawal Amount in INR (₹)</label>
              <input
                type="number"
                placeholder="Enter amount in INR"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount in USD</label>
              <input
                type="number"
                placeholder="Enter amount in USD"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter OTP</label>
              <input
                type="number"
                placeholder="Enter OTP"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>
          </div>
        )}

        {/* USDT CASE Form */}
        {transactionType === 'USDT' && (
          <div className="bg-gray-700 p-6 rounded mb-4">
            <h3 className="text-xl mb-4 text-red-500">Important to know</h3>
            <p className="text-sm mb-2">Minimum Withdrawal amount :- (10$)</p>
            <p className="text-sm mb-2">We'll process your Withdrawal request within 24 hours Monday to Friday.
            </p>
            <p className="text-sm mb-2">Saturday and Sunday request are queued on monday morning.</p>
            <p className="text-sm mb-2">Please note that only supported networks on VIP Traid are shown.</p>
            <p className="text-sm mb-2">If you deposit via another network your asset may be lost.</p>
            


            <div className="mb-4">
  <label className="block text-sm font-medium mb-2">Select Network</label>
  <select
    className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
    defaultValue=""
  >
    <option value="" disabled>Select method</option>
    <option value="method1">USDT Tether Tron (TRC-20)</option>
    <option value="method2">USDT Tether Ethereum(ERC-20)</option>
    <option value="method3">USDT Tether BNB Smart Chain(BEP-20)</option>
    {/* Add more options as needed */}
  </select>
</div>


            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">USDT Address</label>
              <input
                type="number"
                placeholder="usdt address"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount in USD </label>
              <input
                type="number"
                placeholder="amount in usd"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter OTP </label>
              <input
                type="number"
                placeholder="please enter OTP"
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
            
              />
             
            </div>
          </div>
        )}

        {/* Confirm Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition duration-300 ease-in-out">
          Confirm Your Request
        </button>
      </div>
    </div>
  );
};

export default Withdrawal;