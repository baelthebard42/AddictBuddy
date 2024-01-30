import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.authSlice);
  return (
    <section className="text-gray-600 body-font min-h-full flex items-center">
      <div className="container mx-auto flex px-5 items-center justify-center flex-col">
        {user.streak !== 0 && (
          <div className="flex items-center leading-[14rem] text-black">
            <span className="text-7xl">&#x1F525;</span>
            <span className="text-[12rem]">{user.streak}</span>
            <span className="text-7xl">&#x1F525;</span>
          </div>
        )}
        {user.streak === 0 && (
          <div className="flex items-center leading-[14rem] text-black">
            <span className="text-3xl pr-2">&#x1F622;</span>
            <span className="text-[12rem]">{user.streak}</span>
            <span className="text-3xl pl-2">&#x1F622;</span>
          </div>
        )}
        <div className="text-center lg:w-3/4 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Daily Chat Streak
          </h1>
          <p className="mb-8 leading-relaxed">
            You don't have a streak talking to your buddy. Keep chatting daily
            to maintain the streak.
          </p>
          <div className="flex justify-center">
            <Link to="/chat">
              <button className="inline-flex text-white bg-purple-500 uppercase font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Talk more
              </button>
            </Link>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 uppercase font-semibold px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
              All Streaks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
