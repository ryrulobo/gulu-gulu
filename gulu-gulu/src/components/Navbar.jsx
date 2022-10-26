import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import Swal from "sweetalert2";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    if (access_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [access_token]);

  const logoutAction = () => {
    Swal.fire({
      title: "Are you sure want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear();
        setIsLogin(false);
        Swal.fire({
          icon: "success",
          title: "Log out success",
        });
      }
      if (location.pathname === "/bookmark") {
        navigate("/");
      }
      window.location.reload(false);
    });
  };

  return (
    <div className="p-4 flex flex-wrap sm:justify-between justify-center items-center border-b border-gray-300">
      <div className="flex justify-content-between items-center space-x-3 w-screen">
        <Link to="/" className="pl-1">
          <img
            className="md:h-[35px] md:w-[175px] xs:w-[80px] sm:w-[170px] xsm:w-[100px]"
            src={logo}
            alt="logo"
          />
        </Link>
        {location.pathname !== "/bookmark" ? <Search /> : null}
        {!isLogin ? (
          <Link to="/login" className="absolute right-5 xs:right-2">
            <button className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white py-2 px-4 rounded">
              Login
            </button>
          </Link>
        ) : (
          <div className="absolute md:flex md:items-center sm:flex sm:items-center xml:flex xml:items-center  lg:right-5 md:right-2 xml:right-1 xs:right-1 xsm:right-1 xmm:right-2">
            {location.pathname === "/news" && (
              <Link to="/bookmark">
                <p className="hover:underline hover:text-blue-700 mr-4 xs:mb-1 xsm:mb-1 xmm:mb-1">
                  Bookmark
                </p>
              </Link>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 hover:shadow-lg text-white py-2 px-3 rounded"
              onClick={logoutAction}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
