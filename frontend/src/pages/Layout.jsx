import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Relapse from "../components/Relapse";
import { useSelector } from "react-redux";

const Layout = () => {
  const { relapse } = useSelector((state) => state.conversationSlice);
  return (
    <div>
      {!relapse && <Navbar />}
      <main
        className={`min-h-screen grid place-items-center ${
          !relapse ? `pt-20` : `bg-red-100`
        }`}
      >
        <Outlet />
      </main>
      <Relapse />
    </div>
  );
};

export default Layout;
