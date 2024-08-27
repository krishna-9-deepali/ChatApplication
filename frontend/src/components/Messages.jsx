import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
// import ScrollToBottom from "react-scroll-to-bottom";

function Messages() {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  return (
    // <ScrollToBottom className="px-4 flex-1 overflow-auto">
    <div className="px-4 flex-1 overflow-auto">
      {messages &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
    // </ScrollToBottom>
  );
}

export default Messages;
