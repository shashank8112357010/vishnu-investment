import React, { useEffect, useState } from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";

import { getUserStats } from '../../services/api.service';
import { toast } from 'react-toastify';


export default function Admin_Dashboard() {

  let [data, setData] = useState(
    {
      "username": "John Doe",
      "email": "Johndoe@gmail.com",
      "referalEmail": "N/A",
      "totalDeposits": 0,
      "referalLink": "http://localhost:5173/register/DEMO-TRUSTBOT-91",
      "status": "unverified",
      "profitRate": "0.73",
      "tradeProfitIncome": 0,
      "referalIncome": 0,
      "totalBalance": 0,
      "totalWithdrawals": 0,
      "withdrawalBalance": 0
  }
  )

  useEffect(() => {
    getUserStats().then((res) => {
      console.log(res)

      setData(res.data.stats)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  // Copy Link here

  const handleCopy=()=>{
    navigator.clipboard.writeText(data.referalLink)
    toast.success('Text Copied')
  }



  return (
    <>
      <div className='flex flex-col justify-start items-start gap-6 '>
        <h1 className='px-5 py-2 bg-gray-400 inline-block rounded-md md:text-3xl text-black font-bold uppercase'>Dashboard</h1>


        <div>
          <p className='text-xl font-bold'>Status: <span className={data.status == "verified" ? "text-green-700 text-xl" : "text-red-700 text-xl"}>{data.status}</span></p>
        </div>


       

        <div className=" flex flex-col justify-center items-center p-4">
          {/* Card Container */}
          <div className="grid gap-6 md:grid-cols-2 ">

            {/* First Card */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex w-[450px]">
              <div className=''>
                <p>User Name : </p>
                <p>User Email : </p>
                <p className='mr-2'>Referral Email : </p>
              </div>
              
              <div className='w-1/2  '>
                <p>{data?.username}</p> 
                <p> {data?.email}</p>
                <p> {data?.referalEmail}</p>
              </div>
            </div>

            {/* Second Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h2 className="text-md mb-1 ">Referral Program  :  Earn a stable income by</h2>
              <p className="">
                introducing clients to Enter Company Name
              </p>
              <div className='w-[280px] h-8 mt-3 bg-gray-200 rounded-full flex items-center text-black  justify-between overflow-hidden border'>
                <p className='pl-5 w-[350px] h-5 inline-block overflow-hidden'>{data?.referalLink}</p>
                <p className='bg-black p-5 rounded-full text-white cursor-pointer' onClick={handleCopy}>Copy</p>
              </div>
            </div>

          </div>
        </div>



        <div className=" flex flex-col justify-center items-center p-4">
          {/* Card Container */}
          <div className="grid gap-6 md:grid-cols-4 w-full">

            {/* First Card */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 justify-center  items-center">
              <div className='text:xl font-semibold '>
                <p>Deposit </p>
                <p className='text-center'>$ {data.totalDeposits}</p>
              </div>
              <div className='text:xl font-semibold'>
                <FcMoneyTransfer className='inline text-2xl md:text-4xl' />
              </div>
            </div>

            {/* Second Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p>Daily Profit Rate </p>
                <p className='text-center'>{data.profitRate}%</p>
              </div>
              <div className=' text:xl font-semibold'>
                <GiTakeMyMoney className='inline text-2xl md:text-4xl' />
              </div>
            </div>

            {/* Third Card with Search Field */}

            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p>Trade Profit Income</p>
                <p className='text-center'>$ {data.tradeProfitIncome}</p>
              </div>
              <div className=' text:xl font-semibold'>
                <GiReceiveMoney className='inline text-2xl md:text-4xl' />
              </div>
            </div>


            {/* Fourth Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p>Referral Income</p>
                <p className='text-center'>$ {data.referalIncome}</p>
              </div>
              <div className=' text:xl font-semibold'>
                <RiMoneyDollarCircleFill className='inline text-2xl md:text-4xl' />
              </div>
            </div>

            {/* Five Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p>Total Balance </p>
                <p className='text-center'>$ {data.totalBalance}</p>
              </div>
              <div className=' text:xl font-semibold'>
                <BsCashCoin className='inline text-2xl md:text-4xl' />
              </div>
            </div>

            {/* Six Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p>Total Withdrawal</p>
                <p className='text-center'>$ {data.totalWithdrawals}</p>
              </div>
              <div className=' text:xl font-semibold'>
                <FaAward className='inline text-2xl md:text-4xl' />
              </div>
            </div>

            {/* Seven Card with Search Field */}
            <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
              <div className='text:xl  font-semibold'>
                <p className='text-center'>Withdrawable Balance </p>
                <p className='text-center'>$ {data.withdrawalBalance}</p>
              </div>
              <div className=' text:xl font-semibold'>
                <GiMoneyStack className='inline text-2xl md:text-4xl' />
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
