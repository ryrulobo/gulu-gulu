import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="p-4 flex flex-wrap sm:justify-between justify-center items-center border-b border-gray-300">
      <div className="flex justify-content-between items-center space-x-3 w-screen">
        <Link to="/">
          <img
            className="md:h-[35px] md:w-[175px] xs:w-[100px] sm:w-[170px] xsm:w-[100px]"
            src={logo}
            alt="logo"
          />
        </Link>
        <Search />
        <Link to="/login" className="absolute right-5 xs:right-2">
          <button className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
