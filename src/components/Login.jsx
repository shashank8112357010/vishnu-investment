import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { LoginUser } from "../services/api.service";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await LoginUser(formValues);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("isVerified", res?.data?.isVerified);

      toast.success(`${res.data.username} Logged In `);

      // console.log(res?.data);
      setFormValues({ email: "", password: "" }); // Reset the form
      if(res?.data?.role === "admin") {
        navigate("/admin");
      }
      else{
        navigate("/dashboard");
      }
   
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false); // Ensure loading is disabled after request
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 border rounded bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
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
              value={formValues.email}
              onChange={handleChange}
              disabled={loading} // Disable input during request
            />
          </div>

          {/* Password Field */}
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
              disabled={loading} // Disable input during request
            />
            {showPass ? (
              <IoEyeOffSharp
                className="absolute top-[40px] right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <IoEyeSharp
                className="absolute top-[40px] right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded"
            disabled={loading} // Disable button during request
          >
            {loading ? <Loader color="white" size="6" /> : "Submit"}
          </button>
        </form>

        <hr className="my-4" />

        <div className="flex justify-between text-sm">
          <p>
            Not a member?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
