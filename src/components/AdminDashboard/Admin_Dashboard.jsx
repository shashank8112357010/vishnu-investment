import React, { useEffect, useState } from 'react';
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney, GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { getUserStats } from '../../services/api.service';
import { FaCopy } from "react-icons/fa";
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
      <div className="flex flex-col items-start justify-start gap-6  lg:px-8">
        <h1 className="px-3 py-2 bg-gray-400 inline- rounded-md  text-black font-bold uppercase">
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
                      <p className=" border text-sm bg-gray-700 py-1 hidden px-3 rounded md:flex justify-between mt-2">
                      {data?.referalLink.slice(0,40) + "..."}
                    <FaCopy className="inline ml-3 text-2xl cursor-pointer" title='Click to Copy Referral Code'
                      onClick={handleCopy}/>    </p>
                      <p className=" border text-sm bg-gray-700 py-1 px-3 md:hidden rounded flex justify-between mt-2">
                      {data?.referalLink.slice(0,30) + "..."}
                    <FaCopy className="inline ml-3 text-2xl cursor-pointer" title='Click to Copy Referral Code'
                      onClick={handleCopy}/>    </p>
                      </div>
                    </div>
              </di>
            </div>






        <div className="flex w-full flex-col items-center p-4">
          {/* Financial Data */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
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
                <p className="text-sm font-normal sm:text-lg ">{card.label}</p>
                <p className="text-center md:text-lg sm:text-xl font-bold">
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
