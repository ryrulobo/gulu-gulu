import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { register } from "../store/actions/userActionCreator";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerAction = (e) => {
    e.preventDefault();
    dispatch(register(registerForm))
      .then((res) => {
        if (!res.err) {
          Swal.fire({
            icon: "success",
            title: "Register success",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: res.err.response.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: err,
        });
      });
  };

  return (
    <div className="md:h-screen bg-white relative flex flex-col justify-center items-center">
      <div className="md:border md:border-gray-300 bg-white md:shadow-lg shadow-none rounded p-10 w-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <Link to="/">
            <img src={logo} className="w-[150px]" alt="logo" />
          </Link>
          <span className="text-2xl font-semi-bold leading-normal">
            Register
          </span>
          <p className="leading-normal">Create new account</p>
        </div>
        <form onSubmit={registerAction} className="my-8">
          <div className="relative mb-2">
            <label
              className="block text-gray-700 text-sm mb-2 font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight hover:shadow-md outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  username: e.target.value,
                });
              }}
              value={registerForm.username}
            ></input>
            <label
              className="block text-gray-700 text-sm mb-2 pt-3 font-medium"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight hover:shadow-md outline-none"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  email: e.target.value,
                });
              }}
              value={registerForm.email}
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
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  password: e.target.value,
                });
              }}
              value={registerForm.password}
            ></input>
          </div>
          <div className="space-y-9 pt-10">
            <div className="text-sm flex justify-between items-center">
              <Link to="/login">
                <p className="font-medium text-blue-500 py-2 px-2 rounded -ml-2 hover:bg-blue-50 hover:text-blue-700">
                  Sign in
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
