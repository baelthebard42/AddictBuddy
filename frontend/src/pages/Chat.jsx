import { useState, useEffect, useRef } from "react";
import {
  useGetNormalReplyMutation,
  useGetRelapseReplyMutation,
} from "../redux/services/botService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRelapseConversation,
  relapseOff,
  setNormalConversation,
  setRelapseConversation,
} from "../redux/slices/conversationSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { relapse } = useSelector((state) => state.conversationSlice);
  const lastMessageRef = useRef(null);
  const { token } = useSelector((state) => state.authSlice);
  const { normalConversation } = useSelector(
    (state) => state.conversationSlice
  );
  const { relapseConversation } = useSelector(
    (state) => state.conversationSlice
  );
  const [chatQuery, setChatQuery] = useState("");
  const [chatLog, setChatLog] = relapse
    ? useState(relapseConversation)
    : useState(normalConversation);

  let [getReply, { data, isSuccess, isLoading, isError, error }] = relapse
    ? useGetRelapseReplyMutation()
    : useGetNormalReplyMutation();

  const handleNormal = () => {
    dispatch(relapseOff());
    dispatch(deleteRelapseConversation());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery || chatQuery.trim().length === 0) {
      toast.error("Please type a message before sending.");
      return;
    }
    setChatLog([...chatLog, { user: "you", message: chatQuery }]);
    setChatQuery("");
    getMessage();
  };

  const getMessage = async () => {
    await getReply({
      data: {
        userInput: chatQuery,
      },
      token: token.access,
    });
  };

  useEffect(() => {
    if (normalConversation.length === 0) getMessage();
  }, []);

  useEffect(() => {
    if (relapse) {
      setChatLog(relapseConversation);
      getMessage();
    } else setChatLog(normalConversation);
  }, [relapse]);

  useEffect(() => {
    if (isSuccess) {
      setChatLog([...chatLog, { user: "buddy", message: data.reply }]);
      dispatch(
        relapse
          ? setRelapseConversation([
              ...chatLog,
              { user: "buddy", message: data.reply },
            ])
          : setNormalConversation([
              ...chatLog,
              { user: "buddy", message: data.reply },
            ])
      );
    } else if (isError) {
      toast.error(
        "Error getting buddy's reply in. Please send the message again."
      );
      setChatLog((prevChatLog) => {
        prevChatLog.pop();
        return prevChatLog;
      });
    }
  }, [data, isSuccess, isLoading, isError, error]);

  useEffect(() => {
    if (lastMessageRef.current)
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const conversationEl =
    chatLog.length === 0 ? (
      <p className="text-gray-600 text-center text-xl py-2">
        {relapse
          ? "Conversations in relapse mode are deleted as soon as you turn it off."
          : "Don't worry, your conversations are deleted as soon as you log out."}
      </p>
    ) : (
      chatLog.map(({ user, message }, index) => (
        <div
          key={index}
          className={`py-6 flex ${
            user === "buddy" ? (relapse ? `bg-red-300` : `bg-purple-200`) : ``
          } `}
        >
          <div className="uppercase font-bold w-24 pl-10 text-center">
            {user}
          </div>
          <div className="px-10">{message}</div>
        </div>
      ))
    );

  return (
    <section className="container text-gray-900">
      {relapse && (
        <div className="fixed top-0 left-0 w-full h-10 bg-red-500 flex justify-center items-center">
          <p className="text-white font-semibold uppercase">Relapse Mode</p>
          <button
            className="ml-4 inline-flex text-gray-800 bg-white border-0 py-1 uppercase font-semibold px-2 focus:outline-none hover:bg-gray-200 rounded"
            onClick={handleNormal}
          >
            Turn off
          </button>
        </div>
      )}
      <div className="py-3 text-left flex flex-col pb-20">
        {conversationEl}
        {isLoading && (
          <div
            className={`py-6 flex ${relapse ? `bg-red-300` : `bg-purple-200`}`}
          >
            <div className="uppercase font-bold w-24 pl-10 text-center">
              Buddy
            </div>
            <div className="px-10 text-gray-700">Buddy is thinking...</div>
          </div>
        )}
        <div ref={lastMessageRef} />
      </div>
      <div
        className={`fixed py-4 bottom-0 left-1/2 -translate-x-1/2 container h-20 ${
          relapse ? `bg-red-100` : `bg-white`
        }`}
      >
        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading}
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            type="text"
            rows={1}
            className={`${
              relapse ? `bg-red-200` : `bg-gray-200`
            } w-full rounded-md border-none outline-none shadow-md p-3 text-gray-800`}
            placeholder="Type your message here"
          />
        </form>
      </div>
    </section>
  );
};
export default Chat;
