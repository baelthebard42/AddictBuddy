import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen grid place-items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
