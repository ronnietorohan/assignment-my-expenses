import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isLoggedIn = true;

    if (isLoggedIn) {
      navigate("/viewexpenses");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-900">
      <div className="bg-gradient-to-b from-gray-300 to-gray-900 w-7/12 dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 ">Welcome!</h1>
        <form action="#" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-medium text-gray-900  mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-blue-700"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block text-sm font-medium text-gray-900  mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-blue-700"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black hover:text-white bg-indigo-500 hover:bg-indigo-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
