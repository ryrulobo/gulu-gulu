import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Links from "./Links";
import { useResultContext } from "../contexts/ResultContextProvider";

export default function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q");

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
      setText(searchQuery);
      setSearchParams({ q: searchQuery });
    }
  }, [searchQuery]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (text !== "") {
      setText(e.target.value);
      setSearchTerm(text);
      setSearchParams({ q: text });
    }
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 mt-0 pl-0">
      <form onSubmit={submitHandler}>
        <div className="relative text-gray-600 rounded-full border hover:shadow-md mt-2 mb-2 xs:w-[160px] xsm:w-[180px] xmm:w-[200px] sm:w-96 w-80 h-10">
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
            className="py-2 bg-transparent rounded-md pl-12 md:w-[584px] sm:w-[400px] outline-none"
            placeholder="Search here"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </form>
      {/* haven't worked */}
      {/* {text && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        ></button>
      )} */}
      <Links />
    </div>
  );
}
