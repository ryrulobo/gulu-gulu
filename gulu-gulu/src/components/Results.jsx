import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addBookmark } from "../store/actions/userActionCreator";

import NormalSearch from "./NormalSearch";
import ImageSearch from "./ImageSearch";
import NewsSearch from "./NewsSearch";

import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

export default function Results() {
  const { results, getResults, isLoading, searchTerm } = useResultContext();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access_token = localStorage.getItem("access_token");

  const [isLogin, setIsLogin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookmarkData, setBookmarkData] = useState({
    datePublished: "",
    provider: "",
    image: "",
    name: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/search") {
        getResults("search");
        setSearchParams({ q: searchTerm });
      } else if (location.pathname === "/images") {
        getResults("images/details");
        setSearchParams({ q: searchTerm });
      } else if (location.pathname === "/news") {
        getResults("news");
        setSearchParams({ q: searchTerm });
      }
    }
  }, [searchTerm, location.pathname]);

  useEffect(() => {
    if (access_token) {
      setIsLogin(true);
    }
  }, [access_token]);

  const addBookmarkAction = () => {
    dispatch(addBookmark(bookmarkData, access_token))
      .then((res) => {
        if (!res.err) {
          setBookmarkData({
            ...bookmarkData,
            datePublished: "",
            provider: "",
            image: "",
            name: "",
            description: "",
            url: "",
          });
          Swal.fire({
            icon: "success",
            title: "Bookmark added",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: res.err.response.data.message,
          });
          setBookmarkData({
            ...bookmarkData,
            datePublished: "",
            provider: "",
            image: "",
            name: "",
            description: "",
            url: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: err,
        });
      });
  };

  useEffect(() => {
    if (bookmarkData.url !== "") {
      addBookmarkAction();
    }
  }, [bookmarkData.url]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return <NormalSearch results={results} />;
    case "/images":
      return <ImageSearch results={results} />;
    case "/news":
      return (
        <NewsSearch
          results={results}
          isLogin={isLogin}
          bookmarkData={bookmarkData}
          setBookmarkData={setBookmarkData}
        />
      );
    default:
      return "ERROR";
  }
}
