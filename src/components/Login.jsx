import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

export default function Login() {
  let [showPass, setShowPass] =useState(false)
  let [data,setData]=useState({
    email:"",
    password:""
  })

  return (
    <div>
       <div>
       <div className='w-full h-auto flex flex-col justify-center items-center welcome-main-container'> 
            <div className='w-full h-auto flex flex-col justify-center items-center background-color welcome-boxcontainer pt-24 pb-10 '>
               <div className='border rounded bg-[#0D0B1A]'>
               <div className='w-full flex  flex-col justify-center items-center ' id='bannerimage'>
                    <h1 className='text-[25px] uppercase font-bold pt-2 z-50 text-white'>Login</h1>
                </div>
                <div className='w-full h-auto  '>
                <form  className='flex flex-col items-center p-5'>
                        <div className='w-full md:flex items-center justify-center '>
                            <input type="text" placeholder='Enter User ID' className=' w-full md:w-full h-[38px] px-3 text-xl font-medium border rounded mb-3 md:mb-0 bg-[#27272A]' name='sponsorId ' onChange{(e)=>setDta(e.target.value)}/>
                            
                        </div>
                        <div className='w-full md:flex  items-center justify-center relative'>
                            <input type={showPass ? "text":"password"} placeholder='Enter Password' className=' w-full md:w-full h-[38px] px-3 text- font-medium border rounded mb-3 md:mb-0 bg-[#27272A] text-white' name='sponsorId '/>
                           {showPass ? <IoEyeSharp className='absolute text-white top-[20%] right-2 cursor-pointer' onClick={()=>setShowPass(!showPass)}/>: <IoEyeOffSharp  className='absolute text-white top-[20%] right-2 cursor-pointer' onClick={()=>setShowPass(!showPass)}/>
                           }
                        </div>
                        <button value='submit' name='submit' className='bg-blue-800 text-white px-3 py-2 text-md uppercase font-bold rounded hover:bg-slate-900'>Submit</button>
                        </form>
                        <hr/>

                        <div className='flex justify-around px-2 py-2'>
                            <h1 className='text-md text-white'>Not a member ? <Link to='/register' className='text-blue-600'>Register Now</Link></h1>&nbsp;&nbsp;
                            <h1 className='text-md text-white'>Forgate Password ?</h1>
                        </div>
                </div>
               </div>
            </div>
       </div>
    </div>
    </div>
  )
}
