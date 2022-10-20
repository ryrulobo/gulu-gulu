import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="p-4 flex flex-wrap sm:justify-between justify-center items-center border-b border-gray-200">
      <div className="flex justify-content-between items-center space-x-5 w-screen">
        <Link to="/">
          <img class="h-[35px] w-[175px]" src={logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
}
