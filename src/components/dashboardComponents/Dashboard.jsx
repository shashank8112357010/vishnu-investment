import React, { useEffect, useState } from 'react';
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney, GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

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
      <div className="flex flex-col justify-start items-start gap-6">
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
              <p className="text-xl font-bold">
                Status:{' '}
                <span
                  className={
                    data?.status === "verified" ? "text-green-700 text-xl" : "text-red-700 text-xl"
                  }
                >
                  {data?.status}
                </span>
              </p>
            </div>

            {/* User Information Cards */}
            <div className="flex flex-col justify-center items-center p-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex w-[450px]">
                  <div>
                    <p>User Name: </p>
                    <p>User Email: </p>
                    <p>Referral Email: </p>
                  </div>
                  <div className="w-1/2">
                    <p>{data?.username}</p>
                    <p>{data?.email}</p>
                    <p>{data?.referalEmail}</p>
                  </div>
                </div>

                <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                  <h2 className="text-md mb-1">Referral Program: Earn a stable income by</h2>
                  <p>introducing clients to Enter Company Name</p>
                  <div className="w-[280px] h-8 mt-3 bg-gray-200 rounded-full flex items-center text-black justify-between overflow-hidden border">
                    <p className="pl-5 w-[350px] h-5 inline-block overflow-hidden">
                      {data?.referalLink}
                    </p>
                    <p
                      className="bg-black p-5 rounded-full text-white cursor-pointer"
                      onClick={handleCopy}
                    >
                      Copy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="flex flex-col justify-center items-center p-4">
              <div className="grid gap-6 md:grid-cols-4 w-full">
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
                    <div className="text-xl font-semibold">
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
