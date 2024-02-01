import { useGetAllAccomplishmentsQuery } from "../redux/services/botService";
import { useEffect } from "react";
import { toast } from "sonner";

const Accomplishments = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAccomplishmentsQuery("", {
      refetchOnMountOrArgChange: true,
    });
  useEffect(() => {
    if (isError) {
      toast.error("Error getting accomplishments.");
    }
  }, [data, isLoading, isSuccess, isError, error]);

  const accomplishmentsEl =
    data && data[0].content === ""   ? (
      <p className="text-gray-600 text-center text-xl py-2">
        No accomplishments yet. Chat with buddy to get them.
      </p>
    ) : (
      data
        ?.sort(({ a, b }) => a.day - b.day)
        .map(({ day, content }, index) => (
          <div key={index} className="p-4 lg:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 py-16 rounded-lg overflow-hidden text-center relative">
              <h2 className="tracking-widest text-xs title-font text-gray-400 mb-1 uppercase">
                Day: {day + 1}
              </h2>
              <h1 className="title-font sm:text-2xl font-semibold text-lg text-gray-900 mb-3 uppercase line-clamp-1">
                {content.split(".")[0]}
              </h1>
              <p className="leading-relaxed line-clamp-6">{content}</p>
            </div>
          </div>
        ))
    );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">{accomplishmentsEl}</div>
      </div>
    </section>
  );
};
export default Accomplishments;
