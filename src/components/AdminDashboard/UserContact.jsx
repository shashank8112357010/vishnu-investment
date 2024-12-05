import React, { useEffect, useState } from "react";
import { getContactUsDetails } from "../../services/api.service"; // Ensure this API function is correctly implemented
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    await getContactUsDetails().then((res)=>{
      setContacts(res?.data?.data || []);
      setLoading(false);
    }).catch((err)=>{
      toast.error("Something Went wrong")
    })

  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-start">
      <h1 className="px-3 py-2 mb-3 bg-gray-400 inline-block rounded-md text-black font-bold uppercase">
        User Contact
      </h1>
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
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Phone Number</th>
                  <th className="p-3 border-b">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                      }
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.email}</td>
                      <td className="p-3">{item.phone_number}</td>
                      <td className="p-3">{item.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No contact messages available
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

export default UserContact;
