import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/services/authService";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { data, isSuccess, isLoading, isError, error }] =
    useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    addiction: "social",
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

  const handleRegister = async () => {
    await registerUser({
      user_name: formData.username,
      email: formData.email,
      password: formData.password,
      type: formData.addiction,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully. Proceed to login.");
      navigate("/login");
    } else if (isError) {
      let message;
      if (error.data.user_name && error.data.email)
        message = "User with that username & email already exists.";
      else if (error.data.user_name)
        message = "User with that username already exists.";
      else if (error.data.email)
        message = "User with that email already exists.";
      else message = "Error creating user.";
      toast.error(message);
    }
  }, [data, isSuccess, isLoading, isError, error]);

  const handleValidation = ({ username, email, password, confirmPassword }) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!username || username.trim().length === 0)
      errors.username = "Username is required.";
    else if (username.trim().length < 3)
      errors.username = "Username too short.";
    if (!email || email.trim().length === 0)
      errors.email = "Email is required.";
    else if (!emailRegex.test(email)) errors.email = "Invalid email.";
    if (!password || password.trim().length === 0)
      errors.password = "Password is required.";
    else if (!passwordRegex.test(password))
      errors.password =
        "Password must be at least 8 characters long with uppercases, lowercases and numbers.";
    if (!confirmPassword)
      errors.confirmPassword = "Password Confirmation is required.";
    else if (confirmPassword !== password)
      errors.confirmPassword = "Passwords don't match each other.";
    setFormErrors(errors);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmited) handleRegister();
  }, [formErrors]);

  return (
    <div
      className="min-h-screen flex items-center"
      style={{ backgroundImage: "linear-gradient(115deg, #09000B, #1F0027)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-neutral-900 rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 lg:pb-20 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center "
            style={{ backgroundImage: 'url("images/registerBackground.jpg")' }}
          >
            <h1 className="text-white text-3xl mb-3 font-semibold uppercase">
              Hey there!
            </h1>
            <div>
              <p className="text-white drop-shadow-2xl">
                Start talking with your buddy to help you stay focused and fight
                your battles.{" "}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-12 text-gray-100">
            <h2 className="text-3xl mb-4 uppercase font-semibold">Register</h2>
            <p className="mb-3">
              Create your account. It's free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit} className="text-neutral-900">
              <div className="mt-3">
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
              <div className="mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                <p className="text-red-500 text-xs pt-1">{formErrors.email}</p>
              </div>
              <div className="mt-3">
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
              <div className="mt-3">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormData}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                <p className="text-red-500 text-xs pt-1">
                  {formErrors.confirmPassword}
                </p>
              </div>
              <div className="mt-2 text-gray-100">
                <p className="text-gray-300 font-bold uppercase">
                  Type of addiction
                </p>
                <div className="flex flex-col lg:flex-row lg:justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="addiction"
                      value="social"
                      defaultChecked
                      onChange={handleFormData}
                      className="border border-gray-400 rounded-md"
                    />{" "}
                    <span>Social Media</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="addiction"
                      value="substance"
                      onChange={handleFormData}
                      className="border border-gray-400 rounded-md"
                    />{" "}
                    <span>Substance Abuse</span>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="w-full bg-purple-500 py-3 text-center text-white rounded-md"
                  disabled={isLoading}
                >
                  Register Now
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1 mt-5">
              <p>Already been here?</p>
              <Link
                to="/login"
                className="text-purple-500 font-semibold uppercase"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
