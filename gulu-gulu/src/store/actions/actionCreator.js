import { baseURL } from "../../constants/url";
import axios from "axios";

// Action type
export const getSearchResult = (payload) => {
  return {
    type: "getSearchResult",
    payload,
  };
};

// search query keyword
let keyword = "barrack obama";

// Fetch search result
export const fetchSearchResult = () => {
  return (dispatch) => {
    axios(`${baseURL}$`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a2c49f1f0bmshfd59c1397b8164ep11c988jsn36349686a205",
        "X-RapidAPI-Host": "google-search-5.p.rapidapi.com",
      },
      data: `{"query": '${keyword}',"gl":"US","hl":"en_US","device":"desktop","duration":"","autocorrect":0,"page":1,"uule":"1","pages":1}`,
    });
  };
};
