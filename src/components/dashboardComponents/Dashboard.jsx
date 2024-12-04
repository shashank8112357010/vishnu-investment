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
      <div className="flex flex-col gap-6 p-0 md:px-6 lg:px-8">
        <h1 className="px-5 py-2 bg-gray-400 inline-block rounded-md md:text-3xl text-black font-bold uppercase">
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
              <div className="w-full grid xl:grid-cols-2 gap-4">
                <div className=" w-full border rounded bg-black py-2 px-3 lg:flex hover:shadow-xl transform transition duration-300 hover:scale-105">
                  <div className="">
                    <p>User Name: <p className='lg:hidden'>{data.username}</p></p>
                    <p>User Email: <p className='lg:hidden'>{data.email}</p></p>
                    <p>Referral: <p className='lg:hidden'> <p>{data.referalEmail === "N/A" ? "Not Referred" : data.referalEmail}</p></p></p>
                  </div>
                  <div className="hidden  lg:block ml-3">
                    <p className='text-sm'>{data.username}</p>
                    <p className='text-sm'>{data.email}</p>
                    <p className='text-sm'>{data.referalEmail === "N/A" ? "Not Referred" : data.referalEmail}</p>
                  </div>
                </div>

                <div className=" border rounded bg-black py-2 px-4 hover:shadow-xl transform transition duration-300 hover:scale-105">
                  <h2 className="mb-2 text-sm ">Referral Program: Earn a stable income by introducing clients to Enter Trust Bot.</h2>
                  {/* <p className='mb-2'>clients to Enter Company Name</p> */}
                  <div className="">
                    <p className=" border text-sm bg-gray-700 py-1 px-3 rounded">
                      {data?.referalLink.slice(0,30) + "..."}
                    <FaCopy className="inline ml-3 text-2xl" title='Click to Copy Referral Code'
                      onClick={handleCopy}/>           
                  
                    </p>
                  </div>
                </div>
              </div>
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
