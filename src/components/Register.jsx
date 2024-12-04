import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "../lib/utils.js";
import { Label } from "./designComponents/Label.jsx";
import { Input } from "./designComponents/Input.jsx";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { RegisterUser, sendOtp } from "../services/api.service.js";
import Loader from "./Loader.jsx";


export default function Register() {
  const params = useParams()
  let navigation = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [otploading, setotpLoading] = useState(false);
  const [formData, setFormData] = useState({
    referralCode: "",
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(()=>{

    if(params.ReferalCode)  setFormData((prev)=>({...prev , referralCode : params.ReferalCode}))
  },[])

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendOTP = async (res) => {
    if(formData.email){
      await sendOtp({email : formData?.email})
    }else{
      toast.error(res?.response?.data)
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();



    await RegisterUser(formData)
      .then((res) => {
        setLoading(false);
        navigation("/login");
        toast.success(res?.response?.data?.message || `${formData.firstName} Registered Successfully `);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="bg-gray-100 py-10 object-center w-full flex justify-center flex-col items-center gap-5">
      <div className="w-[95%] md:w-3/4 mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input border bg-white backdrop-blur-xl mt-[100px]">
        <div className="w-full flex flex-col items-center">
          <img src="/group-3-13@2x.png" className="w-32" alt="" />
          <h2 className="text-black font-semibold font-lora text-3xl tracking-wider text-center">
            Registration Form
          </h2>
        </div>
      

        <form className="my-10" onSubmit={handleSubmit}>
          <div className="md:flex ">
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Enter Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="enteredOTP">Verify Email Address By OTP</Label>
              <div className="flex w-full items-center">
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  type="text"
                  value={formData?.otp}
                  onChange={handleChange}
                  className="w-[200px] md:w-[360px]"
                />
                <button
                  onClick={handleSendOTP}
                  type="button"
                  disabled={otploading}
                  className=" rounded-lg font-[500] h-[39px] text-sm w-full text-white bg-black"
                >
                  {otploading ? "Sending.." : "Send OTP"}
                </button>
              </div>
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type={showpassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              {showpassword ? (
                <IoEyeOffSharp
                  className="absolute text-black top-[45%] right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showpassword)}
                />
              ) : (
                <IoEyeSharp
                  className="absolute text-black top-[45%] right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showpassword)}
                />
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="referralCode">Referral Code (optional)</Label>
              <Input
              disabled={params.ReferalCode}
                id="referralCode"
                placeholder="Referral Link"
                type="text"
                value={formData.referralCode }
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <button
            className={cn(
              "py-1 mt-4 rounded-lg font-[500] text-lg w-full text-white bg-black",
              {
                "cursor-not-allowed": loading,
              }
            )}
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader color="white" size={"6"} /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

function LabelInputContainer({ children, className }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}
