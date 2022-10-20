import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import HomeNavbar from "../components/HomeNavbar";
import { useState } from "react";

export default function Home() {
  const [navbar, setNavbar] = useState(false);
  const [searchType, setSearchType] = useState("search");

  return (
    <>
      {/* Navbar */}
      <HomeNavbar
        navbar={navbar}
        setNavbar={setNavbar}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      {/* Content */}
      <div class="flex h-screen flex-col items-center justify-center bg-white">
        {/* Logo */}
        <div>
          <img class="h-[70px] w-[350px]" src={logo} alt="logo" />
        </div>
        {/* Search section */}
        <div class="md:w-[584px] mx-auto mt-7 flex w-[92%] items-center rounded-full border hover:shadow-md">
          <div class="pl-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none"
            placeholder="Search here"
          />
        </div>
        {/* Search button */}
        <div class="mt-4 flex space-x-12">
          <Link to={`${searchType}`}>
            <button class="bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
