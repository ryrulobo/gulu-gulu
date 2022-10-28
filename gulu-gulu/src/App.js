import "./index.css";

import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ResultContextProvider } from "./contexts/ResultContextProvider";

function App() {
  return (
    <ResultContextProvider>
      <RouterProvider router={router} />
    </ResultContextProvider>
  );
}

export default App;
