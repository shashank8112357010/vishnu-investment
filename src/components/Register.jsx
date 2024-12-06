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
  const params = useParams();
  const navigation = useNavigate();

  const [showpassword, setShowPassword] = useState(false);
  const [otploading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer for resend OTP
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

  useEffect(() => {
    if (params.ReferalCode) {
      setFormData((prev) => ({ ...prev, referralCode: params.ReferalCode }));
    }
  }, [params.ReferalCode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (formData.email) {
      try {
        setOtpLoading(true);
        await sendOtp({ email: formData.email });
        toast.success("OTP sent successfully!");
        setOtpSent(true);
        setResendTimer(60); // Set a 60-second timer
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Email already registered!"
        );
      } finally {
        setOtpLoading(false);
      }
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await RegisterUser(formData);
      toast.success(
        res?.response?.data?.message ||
          `${formData.firstName} Registered Successfully`
      );
      navigation("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-main-container py-10 object-center w-full flex justify-center flex-col items-center gap-5">
      <div className="w-[95%] md:w-3/4 mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input border welcome-boxcontainer backdrop-blur-xl mt-[100px]">
        <div className="w-full flex flex-col items-center">
          <img src="/group-3-13@2x.png" className="w-32" alt="" />
          <h2 className="text-white font-semibold font-lora text-3xl tracking-wider text-center">
            Registration
          </h2>
        </div>

        <form className="my-10" onSubmit={handleSubmit}>
          <div className="md:flex  ">
            <LabelInputContainer className="mb-4 w-full ">
              <Label htmlFor="firstName" className='text-white'>First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="lastName" className='text-white'>Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="dob" className='text-white'>Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="phone" className='text-white'>Phone Number</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="email" className='text-white'>Email Address</Label>
              <Input
                id="email"
                placeholder="Enter Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="enteredOTP" className='text-white'>Verify Email Address By OTP</Label>
              <div className="flex w-full items-center">
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  type="text"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-[200px] md:w-[360px] bg-gray-800 text-white"
                />
                <button
                  onClick={handleSendOTP}
                  type="button"
                  disabled={otploading || resendTimer > 0}
                  className="ml-2 rounded-lg font-[500] h-[39px] text-sm w-full text-white bg-[#071783]"
                >
                  {otploading
                    ? <Loader size="6" color="white" />
                    : resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Send OTP"}
                </button>
              </div>
            </LabelInputContainer>
          </div>

          <div className="md:flex">
            <LabelInputContainer className="mb-4 w-full relative">
              <Label htmlFor="password" className='text-white'>Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type={showpassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
              {showpassword ? (
                <IoEyeOffSharp
                  className="absolute text-white top-[45%] right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showpassword)}
                />
              ) : (
                <IoEyeSharp
                  className="absolute text-white top-[45%] right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showpassword)}
                />
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="referralCode" className='text-white'>Referral Code (optional)</Label>
              <Input
                disabled={params.ReferalCode}
                id="referralCode"
                placeholder="Referral Link"
                type="text"
                value={formData.referralCode}
                onChange={handleChange}
                className='bg-gray-800 text-white'
              />
            </LabelInputContainer>
          </div>

          <button
            className={cn(
              "py-1 mt-4 rounded-lg font-[500] text-lg w-full text-white bg-[#071783]",
              {
                "cursor-not-allowed": loading || !formData.otp,
              }
            )}
            type="submit"
            disabled={loading || !formData.otp}
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
