import React, { useEffect, useState } from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";

import axios from 'axios'


export default function Dashboard() {
  
  let [data,setData] = useState('')

  async function getData() {
    let result=await axios.get('http://localhost:3000/api/getData')
    setData(result.data[0])
  }
  // console.log(data.selfDeposit)
  useEffect(()=>{
    getData()
  },[])



  return (
    <>
      <div className='flex flex-col justify-start items-start gap-6 '>
        <h1 className='px-5 py-2 bg-gray-400 inline-block rounded-md text-3xl text-black font-bold uppercase'>Dashboard</h1>


        <div>
            <p className='text-xl font-bold'>Status: <span className='text-red-700 text-xl'>Unverified</span></p>
        </div> 


        {/* <div className='w-full h-[80px] border rounded-lg shadow-lg shadow-cyan-500/50 flex items-center px-5'>
          <marquee><h1 className='text-xl md:text-2xl lg:text-3xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, temporibus!</h1></marquee>
        </div> */}


        {/* <div className='w-full h-[120px] border rounded-xl px-2 py-5'>
            <p className='text-xl md:text-2xl lg:text-3xl font-bold mb-5'>OctaFX Referral Id:</p>
            <p className='text-xl font-bold inline-block'>https://www.google.com <FaCopy className='inline text-2xl ml-3 cursor-pointer'/></p>
        </div>   */}



        <div className=" flex flex-col justify-center items-center p-4">
      {/* Card Container */}
      <div className="grid gap-6 md:grid-cols-2 w-full">
        
        {/* First Card */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex">
          <div className='w-[40%] text:xl md:text-xl font-semibold'> 
            <p>User Name</p>
            <p>User Id</p>
            <p>Sponsor Name</p>
            <p>Sponsor ID</p>
          </div>
          <div className='w-1/2 text:xl md:text-xl font-semibold'> 
            <p>: User Name</p>
            <p>: User Id</p>
            <p>: Sponsor Name</p>
            <p>: Sponsor ID</p>
          </div>
        </div>

        {/* Second Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
          <h2 className="text-md font-bold mb-4">Referral Program  :  Earn a stable income by</h2>
          <p className="text-lg font-bold mb-4">
          introducing clients to Enter Company Name
          </p>
          <div className='w-full h-10  bg-gray-200 rounded-full flex items-center text-black text-xl font-bold justify-between overflow-hidden border'>
                <p className='pl-5'>https://www.google.com</p>
                <p className='bg-black p-5 rounded-full text-white cursor-pointer'>Copy</p>
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
            <p className='text-center'>$ {data.selfDeposit}</p>
          </div>
          <div className='text:xl font-semibold'> 
          <FcMoneyTransfer  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>

        {/* Second Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p>Daily Profit Rate </p>
            <p className='text-center'>0.73 %</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <GiTakeMyMoney  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>

        {/* Third Card with Search Field */}

        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p>Trade Profit Income</p>
            <p className='text-center'>$ {data.referralIncome}</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <GiReceiveMoney  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>


        {/* Fourth Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p>Referral Income</p>
            <p className='text-center'>$ {data.royaltyIncome}</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <RiMoneyDollarCircleFill  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>
       
        {/* Five Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p>Total Balance </p>
            <p className='text-center'>$ {data.selfDepositCharges}</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <BsCashCoin  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>
       
        {/* Six Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p>Total Withdrawal</p>
            <p className='text-center'>$ {data.rewardIncome}</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <FaAward  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>
       
        {/* Seven Card with Search Field */}
        <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col gap-2 items-center">
          <div className='text:xl  font-semibold'> 
            <p className='text-center'>Withdrawable Balance </p>
            <p className='text-center'>$ {data.totalIncome}</p>
          </div>
          <div className=' text:xl font-semibold'> 
          <GiMoneyStack  className='inline text-2xl md:text-4xl'/>
          </div>
        </div>
       
               
      </div>
    </div>
      </div>
    </>
  )
}
