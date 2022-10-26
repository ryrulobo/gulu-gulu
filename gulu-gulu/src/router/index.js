import { createBrowserRouter } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import Home from "../views/Home";
import SearchResult from "../views/SearchResult";
import Login from "../views/Login";
import Register from "../views/Register";
import Bookmark from "../views/Bookmark";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/images",
        element: <SearchResult />,
      },
      {
        path: "/news",
        element: <SearchResult />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
