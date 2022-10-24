import { createBrowserRouter } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import Home from "../views/Home";
import SearchResult from "../views/SearchResult";

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
      // {
      //   path: "/image",
      //   element: <ImageResult />,
      // },
      // {
      //   path: "/news",
      //   element: <NewsResult />,
      // },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
