import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
function Message({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    // console.log(authUser?.profilePhoto, authUser, selectedUser);
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${
        message?.senderId === authUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile pic"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        {/* <time className="text-xs opacity-50 text-white">
          {`${new Date().getHours()}:${new Date().getMinutes()}`}
        </time> */}
      </div>
      <div className="chat-bubble bg-zinc-200 text-zinc-800">
        {message?.message}
      </div>
    </div>
  );
}

export default Message;
