const Home = () => {
  return (
    <section className="text-gray-600 body-font min-h-full flex items-center">
      <div className="container mx-auto flex p-5 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-4 object-cover object-center rounded"
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Daily Chat Streak
          </h1>
          <p className="mb-8 leading-relaxed">
            It has been 5 days since you have talked with your buddy, daily.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-purple-500 uppercase font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Talk more
            </button>
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
