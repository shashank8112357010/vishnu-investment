import React, { useEffect, useState } from "react";
import { approveOrRejectWithrawls, fetchAllDeposits } from "../../services/api.service";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Modal from "../Modal";

const AdminDepositHistory = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [modalData, setModalData] = useState(null);
  const [rowIndex, setIndex] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllDeposits();
      if (res && res.data && res.data.data) {
        setDeposits(res.data.data);
      } else {
        toast.error("Failed to fetch deposits.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching deposits.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, index) => {
    setIndex(index);
    setActionLoading(id);
    try {
      await approveOrRejectWithrawls({ withdrawalId: id, status: "approved" });
      toast.success("Deposit approved successfully!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve deposit.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearch = () => {
    const filtered = deposits.filter(
      (item) =>
        (!status || item.status === status) &&
        (!fromDate || new Date(item.date) >= new Date(fromDate)) &&
        (!toDate || new Date(item.date) <= new Date(toDate))
    );
    setDeposits(filtered);
  };

  const getCountByStatus = (status) => deposits.filter((item) => item.status === status).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      <div className="flex gap-3">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md text-black font-bold uppercase">
        Deposit History
      </h1>
      <h1 className="text-white bg-green-600  px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md font-bold uppercase">
          <p >Total Approved { " "}{getCountByStatus("approved")}</p>
      </h1>
      <h1 className="text-white bg-yellow-600  px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md font-bold uppercase">
          <p >Total Pending { " "}{getCountByStatus("pending")}</p>
      </h1>
      <h1 className="text-white bg-red-600  px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md font-bold uppercase">
          <p >Total Rejected { " "}{getCountByStatus("rejected")}</p>
      </h1>
        
      </div>
  

      <Modal data={modalData} />

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-600 text-white p-4 rounded-lg text-center shadow-md">
          
        </div>
        <div className="bg-yellow-600 text-white p-4 rounded-lg text-center shadow-md">
          <h3 className="text-lg font-bold">Total Pending</h3>
          <p className="text-2xl">{getCountByStatus("pending")}</p>
        </div>
        <div className="bg-red-600 text-white p-4 rounded-lg text-center shadow-md">
          <h3 className="text-lg font-bold">Total Rejected</h3>
          <p className="text-2xl">{getCountByStatus("rejected")}</p>
        </div>
      </div> */}

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
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
                  <th className="p-3 border-b">Transaction ID</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">Transaction Image</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">User Email</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length > 0 ? (
                  deposits.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.transactionId}</td>
                      <td
                        className="p-3"


                      >
                        ₹{item.amount}
                      </td>
                      <td className="p-3 cursor-pointer "
                        data-bs-toggle="modal"
                        data-bs-target="#verticallyCenteredModal"
                        onClick={() => setModalData(item?.transactionImage)}
                      >
                        View Image
                      </td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">{item.userEmail}</td>
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
                          onClick={() => handleApprove(item.depositId, index)}
                          className={` ${item.status === "approved"
                              ? "bg-gray-600 hover:bg-gray-700"
                              : "bg-green-600 hover:bg-green-700"
                            }  text-white font-semibold w-full py-1 px-3 rounded`}
                          disabled={item.status === "approved" || loading}
                        >
                          {actionLoading === item.depositId && rowIndex === index ? (
                            <Loader color="white" size="6" />
                          ) : item.status === "approved" ? (
                            "Approved"
                          ) : (
                            "Approve"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
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

export default AdminDepositHistory;
