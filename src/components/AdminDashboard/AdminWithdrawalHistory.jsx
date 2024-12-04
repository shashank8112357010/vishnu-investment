import React, { useEffect, useState } from "react";
import { approveOrRejectWithrawls, fetchAllWithdrawls } from "../../services/api.service"; // Assuming API is configured
import Loader from "../../components/Loader"; // Assuming a Loader component exists
import { toast } from "react-toastify"; // For notifications

const AdminWithdrawalHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [rowIndex, setindex] = useState("")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchAllWithdrawls().then((res) => {
        if (res) {
          console.log(res, "ddddddddddd");
          setWithdrawals(res.data.data || []);
        } else {
          toast.error("Failed to fetch withdrawals.");
        }
      }).catch((err) => {
        console.error(err);
      })

    } catch (error) {
      console.error(error);
      toast.error("Error fetching withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, index) => {
    setindex(index)
    console.log(id, "iddddddddddd shashank is here ");
    setActionLoading(id); // Show loader for the specific action
    try {
      // Mock API call for approval

      await approveOrRejectWithrawls({ withdrawalId: id, status: "approved" }).then((res) => {
        fetchData()
        console.log(res, "---------------------------------");

      }).catch((err) => {
        toast.error("error while approval ");
      })
      toast.success("Withdrawal approved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve withdrawal.");
    } finally {
      setActionLoading(null);
    }
  };

  // const handleReject = async (id) => {
  //   setActionLoading(id); // Show loader for the specific action
  //   try {
  //     // Mock API call for rejection
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setWithdrawals((prev) =>
  //       prev.map((withdrawal) =>
  //         withdrawal.id === id ? { ...withdrawal, status: "Rejected" } : withdrawal
  //       )
  //     );
  //     toast.success("Withdrawal rejected successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to reject withdrawal.");
  //   } finally {
  //     setActionLoading(null);
  //   }
  // };

  const handleSearch = () => {
    // Add search logic (filter by status, fromDate, and toDate)
    const filtered = withdrawals.filter(
      (item) =>
        (!status || item.status === status) &&
        (!fromDate || new Date(item.requestData) >= new Date(fromDate)) &&
        (!toDate || new Date(item.requestData) <= new Date(toDate))
    );
    setWithdrawals(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md text-black font-bold uppercase">
      Withdrawal History
      </h1>
      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">From Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">To Date</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader color="white" size="6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 border-b">Sr. No.</th>
                  <th className="p-3 border-b">Withdrawal Method</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">Request Date</th>
                  <th className="p-3 border-b">Approved Date</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              {console.log(withdrawals, "withdrawals")}
              <tbody>
                {withdrawals.length > 0 ? (
                  withdrawals.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.withdrawalMethod}</td>
                      <td className="p-3">₹{item.amount}</td>
                      <td className="p-3">{item.requestedAt}</td>
                      <td className="p-3">
                        {item.approvedDate || "Not Approved"}
                      </td>
                      <td
                        className={`p-3 font-semibold capitalize ${item.status === "approved"
                          ? "text-green-500"
                          : item.status === "rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                          }`}
                      >
                        {item.status}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                        title={item.status === "approved" && "Already approved"}
                          onClick={() => handleApprove(item.withdrawalId, index)}
                          className={` ${item.status === "approved" ?  "bg-slate-800 hover:bg-grey-700" :  "bg-green-600 hover:bg-green-700"}  text-white font-semibold w-full py-1 px-3 rounded`}
                          disabled={item.status === "approved" || loading}
                        >
                          {actionLoading === item.id && rowIndex === index ? (
                            <Loader color="white" size="6" />
                          ) :  item.status === "approved" ? "Approved" : (
                           
                            "Approve"
                          ) 
                          
                          }
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-3 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawalHistory;
