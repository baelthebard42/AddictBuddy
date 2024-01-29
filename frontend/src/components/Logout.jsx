import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../app/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };
  return (
    <button
      className="bg-purple-500 py-2 px-4 font-semibold uppercase text-center text-white rounded-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
