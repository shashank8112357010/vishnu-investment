import React, { useEffect, useState } from "react";
import { getDepositHistory } from "../../services/api.service"

const DepositHistory = () => {
  // const [status, setStatus] = useState("Failed");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  // const [image, setImage] = useState(null);

  const [depositHistory, setDepositHistory] = useState([])

  // const handleStatusChange = (e) => setStatus(e.target.value);
  // const handleFromDateChange = (e) => setFromDate(e.target.value);
  // const handleToDateChange = (e) => setToDate(e.target.value);
  // const handleImageChange = (e) => setImage(e.target.files[0]);

  // const handleSearch = () => {
  //   // Add your search functionality here
  //   console.log({ status, fromDate, toDate });
  // };

  // let tableHeadingData=['Id','A/c Number','Amount','Status']
 

  useEffect(() => {
    getDepositHistory().then((res) => {

      setDepositHistory(res?.data?.data)
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  // let status=false
  return (
    <div className="h-auto background-color border rounded-xl text-white p-4 flex flex-col items-center">
      {/* Header */}
   

      {/* Results Section */}
      <div className="w-full max-w-6xl background-color p-6 rounded-xl shadow-xl mb-6">
        <h3 className="text-2xl font-bold mb-6 text-white">Request History</h3>
        <table className="w-full table-auto">
          <tr>
            {/* {tableHeadingData.map((item)=>( <th>{item}</th>))} */}

            {["Id" , "Date" , "Amount" , "Status"].map((item , index)=><th key={index}>{item}</th>)}
         
          </tr>



          {depositHistory && depositHistory.length > 0 ? (
            depositHistory.map((item, index) => (
              <tr key={index}>
                <td>{item?.transactionId}</td>
                <td>{new Date(item?.date).toLocaleDateString() || "N/A"}</td>
                <td>{item?.amount}</td>
                <td
                  className={
                    item?.status === "approved"
                      ? "text-green-800 bg-green-400 inline px-2 py-[2px] rounded"
                      : item?.status === "approved" ? "text-red-800 bg-yellow-400 rounded inline px-2 py-[2px]" :
                      "text-red-800 bg-red-400 rounded inline px-2 py-[2px]"
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
