import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
const API_URL = import.meta.env.VITE_API_URL
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [formValues, setFormValues] = useState({
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formValues.userId.trim()) newErrors.userId = "User ID is required.";
    if (!formValues.password.trim())
      newErrors.password = "Password is required.";
    else if (formValues.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      try {
        const response = await axios.post(`${API_URL}/login`, {
          userId: formValues.userId,
          password: formValues.password,
        });
        console.log("API Response:", response.data);
        alert("Login Successful!");
      } catch (error) {
        console.error("API Error:", error.response || error.message);
        alert("Login Failed! Please check your credentials.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="w-full h-auto flex flex-col justify-center items-center welcome-main-container">
          <div className="w-full h-auto flex flex-col justify-center items-center background-color welcome-boxcontainer pt-24 pb-10">
            <div className="border rounded bg-[#0D0B1A]">
              <div
                className="w-full flex  flex-col justify-center items-center"
                id="bannerimage"
              >
                <h1 className="text-[25px] uppercase font-bold pt-2 z-50 text-white">
                  Login
                </h1>
              </div>
              <div className="w-full h-auto">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center p-5"
                >
                  {/* User ID */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter User ID"
                      className="w-full md:w-full h-[38px] px-3 text-xl font-medium border rounded mb-3 md:mb-0 bg-[#27272A] text-white"
                      name="userId"
                      value={formValues.userId}
                      onChange={handleChange}
                    />
                    {errors.userId && (
                      <p className="text-red-500 text-sm">
                        {errors.userId}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="w-full  relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter Password"
                      className="w-full md:w-full h-[38px] px-3 text- font-medium border rounded mb-3 md:mb-0 bg-[#27272A] text-white"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    {showPass ? (
                      <IoEyeSharp
                        className="absolute text-white top-[20%] right-2 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      />
                    ) : (
                      <IoEyeOffSharp
                        className="absolute text-white top-[20%] right-2 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      />
                    )}
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    value="submit"
                    name="submit"
                    className="bg-blue-800 text-white px-3 py-2 text-md uppercase font-bold rounded hover:bg-slate-900"
                  >
                    Submit
                  </button>
                </form>
                <hr />

                <div className="flex justify-around px-2 py-2">
                  <h1 className="text-md text-white">
                    Not a member?{" "}
                    <Link to="/register" className="text-blue-600">
                      Register Now
                    </Link>
                  </h1>
                  &nbsp;&nbsp;
                  <h1 className="text-md text-white">Forgot Password?</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
