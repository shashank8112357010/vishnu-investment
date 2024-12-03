import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Dashboard_SideBar from "./Dashboard_SideBar";
import Dashboard_Header from "./Dashboard_Header";

export default function MainDashboard() {
  const navigate = useNavigate();

  // Redirect to login if token is missing
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // State to toggle sidebar visibility
  const [open, setOpen] = useState(true);

  // Toggle sidebar visibility
  const handleClick = () => {
    setOpen(!open);
  };
  

  return (
    <>
      <div className="w-full h-auto admin-bgcolor text-color flex justify-center ">
        {/* Sidebar */}
        <div
          className={`md:w-[28%] xl:w-[22%] w-1/2  h-screen overflow-auto admin-bgcolor md:sticky md:top-0 md:block ${
            open ? " absolute left-0 top-[70px] z-50" : "hidden"
          }`}
        >
          <Dashboard_SideBar open={open} />
        </div>

        {/* Main Content */}
        <div className={` md:w-[72%] xl:w-[78%] w-full h-auto flex flex-col justify-center items-center"}`}>
          <Dashboard_Header onClick={handleClick} />
          <div className="w-full h-auto p-2 md:p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
