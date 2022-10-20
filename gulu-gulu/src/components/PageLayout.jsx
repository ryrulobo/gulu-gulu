import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PageLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
