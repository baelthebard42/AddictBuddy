import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../redux/services/authService";
import { useEffect } from "react";
import { setUser } from "../redux/slices/authSlice";
import { toast } from "sonner";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error, isSuccess } = useGetUserQuery("", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      toast.error("Error getting user.");
    }
  }, [data, isSuccess, isLoading, isError, error]);

  return (
    <section className="text-gray-600 body-font min-h-full flex items-center">
      {data?.streak !== 0 && (
        <div className="container mx-auto flex px-5 items-center justify-center flex-col">
          <div className="flex items-center leading-[14rem] text-black">
            <span className="text-7xl">&#x1F525;</span>
            <span className="text-[12rem]">{data?.streak}</span>
            <span className="text-7xl">&#x1F525;</span>
          </div>
          <div className="text-center lg:w-3/4 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Daily Chat Streak
            </h1>
            <p className="mb-8 leading-relaxed">
              It has been {data?.streak} days since you have talked with your
              buddy, daily.
            </p>
            <div className="flex justify-center">
              <Link to="/chat">
                <button className="inline-flex text-white bg-purple-500 uppercase font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                  Talk
                </button>
              </Link>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 uppercase font-semibold px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                Accomplishments
              </button>
            </div>
          </div>
        </div>
      )}
      {data?.streak === 0 && (
        <div className="container mx-auto flex px-5 items-center justify-center flex-col">
          <div className="flex items-center leading-[14rem] text-black">
            <span className="text-3xl pr-2">&#x1F622;</span>
            <span className="text-[12rem]">{data?.streak}</span>
            <span className="text-3xl pl-2">&#x1F622;</span>
          </div>
          <div className="text-center lg:w-3/4 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Daily Chat Streak
            </h1>
            <p className="mb-8 leading-relaxed">
              You have not maintained a streak talking to your buddy. Keep
              chatting daily to increase the streak.
            </p>
            <div className="flex justify-center">
              <Link to="/chat">
                <button className="inline-flex text-white bg-purple-500 uppercase font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                  Talk
                </button>
              </Link>
              <Link to="/accomplishments">
                <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 uppercase font-semibold px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                  Accomplishments
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
