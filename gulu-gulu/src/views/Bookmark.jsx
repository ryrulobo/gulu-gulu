import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  showBookmark,
  deleteBookmark,
} from "../store/actions/userActionCreator";
import Loading from "../components/Loading";

import moment from "moment";
import Swal from "sweetalert2";

export default function Bookmark() {
  const [bookmark, setBookmark] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");

  const fetchBookmarks = () => {
    setIsLoading(true);
    dispatch(showBookmark(access_token)).then((res) => {
      if (res.data) {
        setBookmark(res.data);
        setIsLoading(false);
      }
    });
  };

  const deleteBookmarkAction = () => {
    dispatch(deleteBookmark(url, access_token))
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Bookmark deleted",
        });
      })
      .catch((res) => {
        Swal.fire({
          icon: "error",
          title: res.err.response.data.message,
        });
      });
  };

  useEffect(() => {
    fetchBookmarks();
    if (url !== "") {
      deleteBookmarkAction();
      setUrl("");
    }
  }, [url]);

  if (isLoading) return <Loading />;

  if (bookmark.length === 0) {
    return (
      <div className="flex flex-wrap justify-center space-y-6 sm:px-56 p-5 h-96 items-center">
        <p className="text-xl">Bookmark is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center space-y-6 sm:px-56 p-5">
      {bookmark.map(
        (
          { datePublished, provider, thumbnail, name, description, url },
          index
        ) => (
          <div key={index} className="grid grid-flow-col gap-5">
            <div key={index} className="w-full">
              <a href={url} target="_blank" rel="noreferrer">
                {provider && provider[0] && (
                  <p className="text-sm">{provider[0].name}</p>
                )}
                <p className="text-lg hover:underline text-blue-700">{name}</p>
              </a>
              <p>{description}</p>
              <p className="text-sm mt-1">
                {moment(datePublished).startOf("day").fromNow()}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                src={thumbnail}
                alt={thumbnail}
                loading="lazy"
                className="w-30 rounded"
              />
            </div>
            <div className="flex justify-center items-center pl-1">
              <button
                onClick={() => {
                  setUrl(url);
                }}
              >
                <svg
                  id="icon"
                  className="w-6 h-6 fill-blue-500 hover:fill-blue-400 stroke-blue-500"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLineJoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
