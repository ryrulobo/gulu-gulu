import logo from "../assets/logo.png";
import HomeNavbar from "../components/HomeNavbar";

import { useNavigate, createSearchParams } from "react-router-dom";
import { useState } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";

export default function Home() {
  const [navbar, setNavbar] = useState(false);
  const [searchType, setSearchType] = useState("search");
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();

  const navigate = useNavigate();

  const navigateParams = () => {
    return (pathname, params) => {
      const path = {
        pathname,
        search: createSearchParams(params).toString(),
      };
      navigate(path);
    };
  };

  const submitHandler = (e) => {
    const navigate = navigateParams();

    e.preventDefault();
    if (text !== "") {
      setText(e.target.value);
      navigate(searchType, { q: text });
      setSearchTerm(text);
    }
  };

  return (
    <div>
      <HomeNavbar
        navbar={navbar}
        setNavbar={setNavbar}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      {/* Content */}
      <div className="flex h-screen flex-col items-center justify-center bg-white">
        {/* Logo */}
        <img className="h-[70px] w-[350px]" src={logo} alt="logo" />
        {/* Search section */}
        <form onSubmit={submitHandler}>
          <div className="relative text-gray-600 rounded-full border hover:shadow-md mt-7 mb-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" className="p-2" onClick={submitHandler}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              value={text}
              type="text"
              className="py-2 bg-transparent rounded-md pl-12 md:w-[584px] sm:w-[400px] py-[15px] outline-none"
              placeholder="Search here"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </form>

        {/* Submit button */}
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white rounded py-2 px-4"
            onClick={submitHandler}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
