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

const authRouter = createBrowserRouter([
  {
    path: "/",
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

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Layout}>
      <Route index Component={Home}></Route>
    </Route>
  )
);

const router = authRouter;
export default router;
