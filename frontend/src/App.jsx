import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { authRouter, mainRouter } from "./Routes";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.authSlice);
  const { user } = useSelector((state) => state.authSlice);

  const router = token && user ? mainRouter : authRouter;

  return (
    <>
      <Toaster richColors closeButton />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
