import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

export default function Results() {
  const { results, getResults, isLoading, searchTerm } = useResultContext();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/search") {
        getResults("organic-search");
        setSearchParams({ q: searchTerm });
      } else if (location.pathname === "/images") {
        getResults("images");
        setSearchParams({ q: searchTerm });
      } else if (location.pathname === "/news") {
        getResults("news");
        setSearchParams({ q: searchTerm });
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-center space-y-5 sm:px-56 p-5">
          {results.map(({ url, title, snippet }, index) => (
            <div key={index} className="w-full">
              <a href={url} target="_blank" rel="noreferrer">
                {url && (
                  <p className="text-sm">
                    {url.length > 80 ? url.substring(0, 30) : url}
                  </p>
                )}
                <p className="text-lg hover:underline text-blue-700">{title}</p>
              </a>
              <p>{snippet}</p>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results.map((url, index) => (
            <a
              className="sm:p-3 p-5"
              href={url}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={url}
                alt={searchTerm}
                loading="lazy"
                className="w-72 hover:scale-105 ease-in duration-100"
              />
              {/* <p className="w-36 break-words text-sm mt-2">{url}</p> */}
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-center space-y-6 sm:px-56 p-5">
          {results.map(
            ({ date_time, image, snippet, source, title, url }, index) => (
              <div className="grid grid-cols-2 gap-5">
                <div key={index} className="w-full">
                  <a href={url} target="_blank" rel="noreferrer">
                    {source && <p className="text-sm">{source.name}</p>}
                    <p className="text-lg hover:underline text-blue-700">
                      {title}
                    </p>
                  </a>
                  <p>{snippet}</p>
                  <p className="text-sm">{date_time}</p>
                </div>
                <div>
                  <img
                    src={image}
                    alt={searchTerm}
                    loading="lazy"
                    className="w-30 rounded"
                  />
                </div>
              </div>
            )
          )}
        </div>
      );
    default:
      return "ERROR";
  }
}
