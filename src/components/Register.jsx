"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "../lib/utils.js";
import axios from "axios";
import { Label } from "./designComponents/Label.jsx";
import { Input } from "./designComponents/Input.jsx";

import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { RegisterUser } from "../services/api.service.js";
import Loader from "./Loader.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  let navigation = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [otploading, setotpLoading] = useState(false);

  const [formData, setFormData] = useState({
    referralCode: "",
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 999999).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendOTP = async () => {
  //   let email = formData.email;
  //   if (email) {
  //     setotpLoading(true);
  //     const otp = generateOTP();

  //     try {
  //       await axios.post(`${API_URL}/verifyotp`, { email, otp });
  //       alert("OTP has been sent to your email");
  //     } catch (err) {
  //       console.error("Error sending OTP:", err);
  //       alert("Failed to send OTP");
  //     } finally {
  //       setotpLoading(false);
  //     }
  //   } else {
  //     alert("Please Enter Email");
  //   }
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    await RegisterUser(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigation("/login");
        toast.success(res.response.data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err?.response.data?.message);
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
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                type="tel"
                value={formData.number}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <div className=" md:flex">
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
              <Label htmlFor="email">Verify Email Address By OTP</Label>
              <div className="flex w-full">
                <Input
                  id="enteredOTP"
                  placeholder="Enter OTP"
                  type="text"
                  value={enteredOTP}
                  onChange={(e) => setEnteredOTP(e.target.value)}
                  className="w-[300px] md:w-[360px]"
                />
                <button
                  onClick={handleSendOTP}
                  disabled={otploading}
                  className="bg-black text-white px-2 rounded ml-2 text  font-[600]"
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
                < IoEyeSharp
                  className="absolute text-black top-[45%] right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showpassword)}
                />
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 w-full">
              <Label htmlFor="referralCode">Referral Code (optional)</Label>
              <Input
                id="referralCode"
                placeholder="Referral Link"
                type="text"
                value={formData.referralCode}
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
