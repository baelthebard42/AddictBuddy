import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../redux/slices/authSlice";
import { useLogoutUserMutation } from "../redux/services/authService";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  deleteNormalConversation,
  deleteRelapseConversation,
} from "../redux/slices/conversationSlice";

const Logout = () => {
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { data, isLoading, isError, isSuccess, error }] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser({
      refresh_token: token?.refresh,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeToken());
      dispatch(removeUser());
      dispatch(deleteNormalConversation());
      dispatch(deleteRelapseConversation());
      navigate("/");
      toast.success("Logged out successfully.");
    } else if (isError) {
      console.log(error);
      toast.error("Error logging out");
    }
  }, [data, isLoading, isSuccess, isError, error]);

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
