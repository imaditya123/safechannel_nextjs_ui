"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const handleToggleMode = () => {
    setIsSignIn(!isSignIn);
    // Clear form fields when switching modes
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignIn) {
        // Sign-in logic

        const user = {
          email: email,
          password: password,
        };

        const response = await axiosInstance.post(
          "/auth/authenticate",
          JSON.stringify(user)
        ); 
       
        const data = JSON.parse(response.data);
        
        const authToken = data['access_token'];
        console.log("Auth Token:",authToken);
        localStorage.setItem('authToken', authToken);
        
        setEmail("");
        setPassword("");
        if(response.status==200){
          router.replace('/');
         }else{
          setAuthError('Invalid credentials');

         }

      } else {
        // Sign-up logic
        const user = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        };

        const response = await axiosInstance.post(
          "/auth/register",
          JSON.stringify(user)
        );
        const data = JSON.parse(response.data);
        const authToken = data['access_token'];
        console.log("Auth Token:",authToken);
        localStorage.setItem('authToken', authToken);
        
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        if(response.status==200){
          router.replace('/');
         }
         else{
          setAuthError('Something went wrong');

         }

      }
    } catch (error) {
      console.error("Error during form submission:", error.message);
      setAuthError('Something went wrong');    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-96">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{authError}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-2">
            <svg onClick={()=>{setAuthError(null)}}
              className="fill-current mb-4 h-6 w-6  text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 0 1 0 .707l-8 8a.5.5 0 1 1-.707-.707l8-8a.5.5 0 0 1 .707 0z"
              />
              <path
                fillRule="evenodd"
                d="M5.652 5.652a.5.5 0 0 1 0 0l8 8a.5.5 0 0 1 0 .707l-8-8a.5.5 0 0 1-.707 0z"
              />
            </svg>
          </span>
        </div>
      )}

          {/* First name and last name fields for larger screens */}
          <div className="sm:flex sm:space-x-4">
            {!isSignIn && (
              <>
                <div className="sm:w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full mt-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-5"
                  />
                </div>
                <div className="sm:w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full mt-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-5"
                  />
                </div>
              </>
            )}
          </div>

          {/* Email and password fields */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-4 px-3 py-1.5 rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSignIn ? "Sign in" : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          {isSignIn ? "Need an account?" : "Already have an account?"}
          <button
            type="button"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 focus:outline-none"
            onClick={handleToggleMode}
          >
            {isSignIn ? "Sign Up" : " Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
