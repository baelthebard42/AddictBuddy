import { useState } from "react";

const Chat = () => {
  const [chatQuery, setChatQuery] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog([
      ...chatLog,
      { user: "you", message: chatQuery },
      { user: "buddy", message: "Hello! I am buddy." },
    ]);
    setChatQuery("");
  };
  console.log(chatLog.length);

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
      <div className="py-3 text-left flex flex-col pb-16">{conversationEl}</div>
      <div className="fixed py-4 bottom-0 left-1/2 -translate-x-1/2 container h-20 bg-white">
        <form onSubmit={handleSubmit}>
          <input
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
