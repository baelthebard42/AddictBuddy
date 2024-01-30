import { useState, useEffect, useRef } from "react";
import { useGetNormalReplyMutation } from "../app/services/chatService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../app/slices/conversationSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const lastMessageRef = useRef(null);
  const { token } = useSelector((state) => state.authSlice);
  const { conversation } = useSelector((state) => state.conversationSlice);
  const [chatQuery, setChatQuery] = useState("");
  const [chatLog, setChatLog] = useState(conversation);

  const [getNormalReply, { data, isSuccess, isLoading, isError, error }] =
    useGetNormalReplyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery || chatQuery.trim().length === 0) {
      toast.error("Please type a message before sending.");
      return;
    }
    setChatLog([...chatLog, { user: "you", message: chatQuery }]);
    setChatQuery("");
    await getNormalReply({
      data: {
        userInput: chatQuery,
      },
      token: token.access,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setChatLog([...chatLog, { user: "buddy", message: data.reply }]);
      dispatch(
        setConversation([...chatLog, { user: "buddy", message: data.reply }])
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
      <p className="text-gray-600 text-center text-xl">
        Start talking to buddy by sending a message.
      </p>
    ) : (
      chatLog.map(({ user, message }, index) => (
        <div
          key={index}
          className={`py-6 flex ${user === "buddy" ? `bg-purple-200` : ``} `}
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
      <div className="py-3 text-left flex flex-col pb-20">
        {conversationEl}
        {isLoading && (
          <div className="py-6 flex bg-purple-200">
            <div className="uppercase font-bold w-24 pl-10 text-center">
              Buddy
            </div>
            <div className="px-10 text-gray-700">Buddy is thinking...</div>
          </div>
        )}
        <div ref={lastMessageRef} />
      </div>
      <div className="fixed py-4 bottom-0 left-1/2 -translate-x-1/2 container h-20 bg-white">
        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading}
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            type="text"
            rows={1}
            className="bg-gray-200 w-full rounded-md border-none outline-none shadow-md p-3 text-gray-800"
            placeholder="Type your message here"
          />
        </form>
      </div>
    </section>
  );
};
export default Chat;
