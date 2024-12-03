import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { LoginUser } from "../../services/api.service";
import { toast } from "react-toastify";
import Loader from "../Loader";

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  let navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await LoginUser(formValues)
      .then((res) => {
        setLoading(false);
        localStorage.setItem('token',res?.data?.token )
        toast.success(res?.data?.message);
        navigate('/dashboard')
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 border rounded bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* User ID */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              User Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter User Email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formValues.userId}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formValues.password}
              onChange={handleChange}
            />
            {showPass ? (
              <IoEyeOffSharp
                className="absolute top-[40px] right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              < IoEyeSharp
                className="absolute top-[40px] right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded "
          > {loading ? <Loader color="white" size={"6"} /> : "Submit"}
            
          </button>
        </form>

        <hr className="my-4" />

        <div className="flex justify-between  text-sm">
          {/* <p>
            Not a member?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p> */}
          <Link
            to="/admin/forgot-password"
            className="text-blue-500 hover:underline "
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
