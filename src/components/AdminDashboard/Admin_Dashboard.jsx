import React, { useEffect, useState } from 'react';
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney, GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { getUserStats } from '../../services/api.service';
import { toast } from 'react-toastify';

export default function Admin_Dashboard() {
  const [data, setData] = useState({
    username: "John Doe",
    email: "Johndoe@gmail.com",
    referalEmail: "N/A",
    totalDeposits: 0,
    referalLink: "http://localhost:5173/register/DEMO-TRUSTBOT-91",
    status: "unverified",
    profitRate: "0.73",
    tradeProfitIncome: 0,
    referalIncome: 0,
    totalBalance: 0,
    totalWithdrawals: 0,
    withdrawalBalance: 0,
  });

  useEffect(() => {
    getUserStats()
      .then((res) => {
        setData(res.data.stats);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.referalLink);
    toast.success('Text Copied');
  };

  return (
    <>
      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <h1 className="px-5 py-2 bg-gray-400 inline-block rounded-md text-lg sm:text-xl md:text-3xl text-black font-bold uppercase">
          Dashboard
        </h1>

        <div>
          <p className="text-md sm:text-lg md:text-xl font-bold">
            Status:{" "}
            <span
              className={`${
                data.status === "verified" ? "text-green-700" : "text-red-700"
              }`}
            >
              {data.status}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center p-4">
          {/* User Info and Referral Program */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 w-full">
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col sm:flex-row">
              <div className="flex-grow text-white">
                <p>User Name:</p>
                <p>User Email:</p>
                <p>Referral Email:</p>
              </div>
              <div className="text-gray-300">
                <p>{data.username}</p>
                <p>{data.email}</p>
                <p>{data.referalEmail === "N/A" ? "Not Referred" : data.referalEmail}</p>
              </div>
            </div>

            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                  <h2 className="text-md mb-1">Referral Program: Earn a stable income by</h2>
                  <p>introducing clients to Enter Company Name</p>
                  <div className="w-full h-8 mt-3 bg-gray-200 rounded-full flex items-center text-black justify-between overflow-hidden border">
                    <p className="pl-5 w-full h-5 inline-block overflow-hidden">
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

        <div className="flex flex-col items-center p-4">
          {/* Financial Data */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            {[
              {
                label: "Deposit",
                value: `$ ${data.totalDeposits}`,
                icon: <FcMoneyTransfer />,
              },
              {
                label: "Daily Profit Rate",
                value: `${data.profitRate}%`,
                icon: <GiTakeMyMoney />,
              },
              {
                label: "Trade Profit Income",
                value: `$ ${data.tradeProfitIncome}`,
                icon: <GiReceiveMoney />,
              },
              {
                label: "Referral Income",
                value: `$ ${data.referalIncome}`,
                icon: <RiMoneyDollarCircleFill />,
              },
              {
                label: "Total Balance",
                value: `$ ${data.totalBalance}`,
                icon: <BsCashCoin />,
              },
              {
                label: "Total Withdrawal",
                value: `$ ${data.totalWithdrawals}`,
                icon: <FaAward />,
              },
              {
                label: "Withdrawable Balance",
                value: `$ ${data.withdrawalBalance}`,
                icon: <GiMoneyStack />,
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col items-center text-gray-300"
              >
                <p className="text-md sm:text-lg font-semibold">{card.label}</p>
                <p className="text-center text-lg sm:text-xl font-bold">
                  {card.value}
                </p>
                <div className="text-2xl sm:text-3xl">{card.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
