import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import Links from "./Links";
import { useResultContext } from "../contexts/ResultContextProvider";

export default function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 mt-0">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 border rounded-full hover:shadow:lg outline-none"
        placeholder="Search here"
        onChange={(e) => setText(e.target.value)}
      />
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
