"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axiosInstance";

const app_header = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = async () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleClick = async () => {
    try {
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };
  const onlogout = async () => {
    try {
      //  axiosInstance.post(
      //       "/auth/logout",
      //   ).then(()=>{
      //   });
      localStorage.clear();
      router.replace("/login");
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div onClick={handleClick} className="flex items-center">
          <a href="#" className="text-lg font-bold text-gray-800">
            SafeChannel
          </a>
        </div>
        <div className="hidden lg:flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="/add-book" className="text-gray-600 hover:text-gray-800">
            Add Book
          </a>
          <a
            onClick={onlogout}
            href="#"
            className="text-gray-600 hover:text-gray-800"
          >            
            Logout
          </a>
         
          {/* <a href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a> */}
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 right-4 bg-white shadow-md rounded-md p-4 space-y-2">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-800 text-sm font-bold block "
            >
              Home
            </a>
            <a
              href="/add-book"
              className="text-gray-400 hover:text-gray-800 text-sm font-bold block "
            >
              Add Book
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-800 text-sm font-bold block "
            >
              Logout
            </a>
            {/* <a
              href="#"
              className="text-gray-400 hover:text-gray-800 text-sm font-bold block "
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-800 text-sm font-bold block "
            >
              Contact
            </a> */}
          </div>
        )}
      </nav>
    </header>
  );
};

export default app_header;
