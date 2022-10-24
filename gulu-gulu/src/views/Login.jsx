import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Login() {
  return (
    <div className="md:h-screen bg-white relative flex flex-col justify-center items-center">
      <div className="md:border md:border-gray-300 bg-white md:shadow-lg shadow-none rounded p-10 w-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <Link to="/">
            <img src={logo} className="w-[150px]" alt="logo" />
          </Link>
          <span className="text-2xl font-semi-bold leading-normal">
            Sign in
          </span>
          <p className="leading-normal">Use your Gulu-Gulu account</p>
        </div>
        <form className="my-8">
          <div className="relative mb-2">
            <label
              className="block text-gray-700 text-sm mb-2 font-medium"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight hover:shadow-md outline-none"
              type="email"
              placeholder="Email"
            ></input>
            <label
              className="block text-gray-700 text-sm mb-2 pt-3 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight hover:shadow-md outline-none"
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <div className="space-y-9 pt-10">
            <div className="text-sm flex justify-between items-center">
              <Link to="/register">
                <p className="font-medium text-blue-500 py-2 px-2 rounded -ml-2 hover:bg-blue-50 hover:text-blue-700">
                  Register
                </p>
              </Link>
              <button className="py-2 px-6 bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white rounded">
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
