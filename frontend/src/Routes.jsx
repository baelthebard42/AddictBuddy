import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Accomplishments from "./pages/Accomplishments";

export const authRouter = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Layout}>
      <Route index Component={Home}></Route>
      <Route path="/chat" Component={Chat}></Route>
      <Route path="/accomplishments" Component={Accomplishments}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);
