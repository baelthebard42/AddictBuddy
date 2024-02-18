import { Link } from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";
import { useState } from "react";

const Navbar = () => {
  const [menuShown, setMenuShown] = useState(false);
  const toggleMenu = () => setMenuShown((prevState) => !prevState);

  return (
    <header className="body-font h-16 xs:h-20 shadow-md w-full fixed z-10 bg-neutral-900">
      <div className="container mx-auto flex flex-wrap p-5 justify-center items-center">
        <Link>
          <Logo />
        </Link>
        <nav
          className={`md:ml-auto flex-wrap items-center text-base duration-200 justify-center hidden xs:flex flex-col md:flex-row h-screen bg-purple-600 md:h-auto top-0 left-full absolute gap-12 md:gap-0 md:static md:bg-transparent w-52 md:w-auto text-white md:text-gray-100 ${
            menuShown ? `-translate-x-full md:translate-x-0` : ``
          }`}
        >
          <span
            className="relative top-0 right-16 md:hidden text-black"
            onClick={toggleMenu}
          >
            <svg
              style={{ color: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                fill="white"
              ></path>
            </svg>
          </span>
          <Link
            to="/chat"
            onClick={toggleMenu}
            className="md:mr-8 md:hover:text-purple-500 hover:text-orange-300 uppercase duration-500 font-semibold"
          >
            Chat
          </Link>
          <Link
            to="/accomplishments"
            onClick={toggleMenu}
            className="md:mr-8 md:hover:text-purple-500 hover:text-orange-300 uppercase duration-500 font-semibold"
          >
            Accomplishments
          </Link>
          <Logout />
        </nav>
        <button
          type="button"
          onClick={toggleMenu}
          className={`xs:inline-flex hidden items-center gap-2 ml-auto rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-black ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base md:hidden`}
        >
          <svg
            style={{ color: "black" }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Menu
        </button>
      </div>
    </header>
  );
};

export default Navbar;
