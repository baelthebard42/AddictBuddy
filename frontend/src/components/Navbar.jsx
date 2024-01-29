import { Link } from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font h-20 shadow-md w-full fixed z-10 bg-white">
      <div className="lg:container mx-auto flex flex-wrap p-5 items-center">
        <Link>
          <Logo />
        </Link>
        <nav className="md:ml-auto flex-wrap items-center text-base justify-center hidden md:flex">
          <Link
            to="/"
            className="mr-8 hover:text-purple-500 uppercase duration-500 font-semibold"
          >
            Home
          </Link>
          <Link className="mr-8 hover:text-purple-500 uppercase duration-500 font-semibold">
            Streaks
          </Link>
          <Link className="mr-8 hover:text-purple-500 uppercase duration-500 font-semibold">
            Achievements
          </Link>
          <Logout />
        </nav>
        <button
          type="button"
          className="xs:inline-flex hidden items-center gap-2 ml-auto rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base md:hidden"
        >
          <svg
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
