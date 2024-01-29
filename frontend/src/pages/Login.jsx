import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/services/authService";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setToken } from "../app/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { data, isSuccess, isLoading, isError, error }] =
    useLoginUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmited, setIsSubmitted] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmited) setIsSubmitted(true);
    handleValidation(formData);
  };

  const handleLogin = async () => {
    await loginUser({
      user_name: formData.username,
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully.");
      dispatch(setToken(data.access));
      navigate("/");
    } else if (isError) {
      console.log(error);
      let message;
      if (error.data?.detail) message = "Invalid Credentials.";
      else message = "Error logging in.";
      toast.error(message);
    }
  }, [data, isSuccess, isLoading, isError, error]);

  const handleValidation = ({ username, password }) => {
    const errors = {};
    if (!username || username.trim().length === 0)
      errors.username = "Username is required.";
    if (!password || password.trim().length === 0)
      errors.password = "Password is required.";
    setFormErrors(errors);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmited) handleLogin();
  }, [formErrors]);

  return (
    <div
      className="min-h-screen flex items-center"
      style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 lg:pb-20 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url("images/registerBackground.jpg")' }}
          >
            <h1 className="text-white text-3xl mb-3 font-semibold uppercase">
              Welcome back!
            </h1>
            <div>
              <p className="text-white">
                Continue talking with your buddy to help you stay focused and
                fight your battles.{" "}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-12">
            <h2 className="text-3xl mb-4 uppercase font-semibold">Login</h2>
            <p className="mb-4">Start using your buddy by logging in.</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleFormData}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                <p className="text-red-500 text-xs pt-1">
                  {formErrors.username}
                </p>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormData}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                <p className="text-red-500 text-xs pt-1">
                  {formErrors.password}
                </p>
              </div>
              <div className="mt-5">
                <button
                  className="w-full bg-purple-500 py-3 text-center text-white rounded-md"
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1 mt-5">
              <p>New around here?</p>
              <Link
                to="/register"
                className="text-purple-500 font-semibold uppercase"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
