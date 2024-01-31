import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Relapse from "../components/Relapse";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";

const Layout = () => {
  const { relapse } = useSelector((state) => state.conversationSlice);
  const { token } = useSelector((state) => state.authSlice);

  return (
    <div>
      {!relapse && <Navbar />}
      <main
        className={`min-h-screen grid place-items-center ${
          !relapse ? `pt-20` : `bg-red-100`
        }`}
      >
        {token ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Relapse />
    </div>
  );
};

export default Layout;
