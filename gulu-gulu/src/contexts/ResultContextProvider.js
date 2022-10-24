import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseURL } from "../constants/url";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // /search, /images, /news
  const getResults = async (type) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      url: `${baseURL}/${type}`,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a2c49f1f0bmshfd59c1397b8164ep11c988jsn36349686a205",
        "X-RapidAPI-Host": "google-search-5.p.rapidapi.com",
      },
      data: `{
        "query":"${searchTerm}",
        "gl":"ID", 
        "hl":"id_ID",
        "device":"desktop",
        "duration":"",
        "autocorrect":0,
        "page":1,
        "uule":"1",
        "pages":2
      }`,
    };

    const { data } = await axios(options);

    // set result based on search term
    if (type === "organic-search") {
      setResults(data.data.organic);
    } else if (type === "images" || type === "news") {
      setResults(data.data.results);
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
