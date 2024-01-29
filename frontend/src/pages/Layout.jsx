import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Relapse from "../components/Relapse";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen grid place-items-center pt-20">
        <Outlet />
      </main>
      <Relapse />
    </div>
  );
};

export default Layout;
