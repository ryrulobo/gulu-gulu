import { createBrowserRouter } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import Home from "../views/Home";
import SearchResult from "../views/SearchResult";
import ImageResult from "../views/ImageResult";
import NewsResult from "../views/NewsResult";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/image",
        element: <ImageResult />,
      },
      {
        path: "/news",
        element: <NewsResult />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
