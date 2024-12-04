import React, { useEffect, useState } from 'react';
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney, GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";

import { getUserStats } from '../../services/api.service';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader'; // Adjust the path to your Loader component

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserStats()
      .then((res) => {
        setData(res.data.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.referalLink || '');
    toast.success('Referral link copied!');
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:p-4 items-start justify-normal">
        <h1 className="px-3 py-2 bg-gray-400 inline-block rounded-md  text-black font-bold uppercase">
          Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[80vh] w-full ">
            <Loader size="16" color="white" />
          </div>
        ) : (
          <>
            {/* User Status */}
            <div>
              <p className="text-xl md:text-2xl px-4 font-bold">
                <span className='mr-2'> 
                  Status:{' '}

                </span>
               
                <span
                  className={
                    data?.status === "verified" ? " uppercase text-green-700 md:text-xl" : "text-red-700 text-xl"
                  }
                >
                  {data?.status}
                </span>
              </p>
            </div>

            {/* User Information Cards */}
            <div className="px-4">
              <di className="">
                     <div className='w-full grid gap-3 grid-cols-1 lg:grid-cols-2 '>
                      <div className='w-full border overflow-hidden py-3 px-2 rounded bg-black hover:shadow-xl transform transition duration-300 hover:scale-105'>
                      <p>User Name : <span className='text-sm'>{data.username}</span></p>
                      <p>User Email : <span className='text-sm'>{data.email}</span></p>
                      <p>Referral Id  : <span className='text-sm'>{data.referalEmail === "N/A" ? "Not Referred" : data.referalEmail}</span></p>
                      </div>
                      <div className='w-full border overflow-hidden py-3 px-2 rounded bg-black hover:shadow-xl transform transition duration-300 hover:scale-105'>
                      <p className='text-sm'>Referral Program: Earn a stable income by introducing clients to Enter Trust Bot.</p>
                      <p className=" border text-sm bg-gray-700 py-1 px-3 rounded flex justify-between mt-2">
                      {data?.referalLink.slice(0,42) + "..."}
                    <FaCopy className="inline ml-3 text-2xl cursor-pointer" title='Click to Copy Referral Code'
                      onClick={handleCopy}/>    </p>
                      </div>
                    </div>
              </di>
            </div>

            {/* Metrics Cards */}
            <div className="flex flex-col justify-center items-center p-4">
              <div className="grid gap-2 lg:gap-6 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full">
                {[
                  { label: 'Deposit', value: data.totalDeposits, icon: <FcMoneyTransfer /> },
                  { label: 'Daily Profit Rate', value: `${data.profitRate}%`, icon: <GiTakeMyMoney /> },
                  { label: 'Trade Profit Income', value: data.tradeProfitIncome, icon: <GiReceiveMoney /> },
                  { label: 'Referral Income', value: data.referalIncome, icon: <RiMoneyDollarCircleFill /> },
                  { label: 'Total Balance', value: data.totalBalance, icon: <BsCashCoin /> },
                  { label: 'Total Withdrawal', value: data.totalWithdrawals, icon: <FaAward /> },
                  { label: 'Withdrawable Balance', value: data.withdrawalBalance, icon: <GiMoneyStack /> },
                ].map(({ label, value, icon }, idx) => (
                  <div
                    key={idx}
                    className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center"
                  >
                    <div className="md:text-xl md:font-normal">
                      <p>{label}</p>
                      {loading ? (
                        <Loader size="4" color="white" />
                      ) : (
                        <p className="text-center">$ {value}</p>
                      )}
                    </div>
                    <div className="text-xl font-semibold">{icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
