import { createContext, useContext, useState } from "react";
import axios from "axios";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = "a2c49f1f0bmshfd59c1397b8164ep11c988jsn36349686a205";

  // /search, /images, /news
  const getResults = async (type) => {
    setIsLoading(true);

    let options = {
      method: "GET",
      url: "https://bing-web-search1.p.rapidapi.com/search",
      params: {
        q: `${searchTerm}`,
        mkt: "id-id",
        safeSearch: "Off",
        textFormat: "Raw",
        freshness: "Day",
        count: "20",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
      },
    };

    if (type === "images/details") {
      options = {
        method: "GET",
        url: "https://bing-image-search1.p.rapidapi.com/images/search",
        params: {
          q: `${searchTerm}`,
          count: "30",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
        },
      };
    } else if (type === "news") {
      options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          q: `${searchTerm}`,
          count: "20",
          freshness: "Day",
          textFormat: "Raw",
          safeSearch: "Off",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
    }

    const { data } = await axios(options);

    // set result based on search term
    if (type === "search") {
      setResults(data.webPages.value);
    } else if (type === "images/details" || type === "news") {
      setResults(data.value);
    }

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
