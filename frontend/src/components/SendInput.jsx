import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
function SendInput() {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // axios.defaults.withCredentials = true;
      const token = sessionStorage.getItem("token");
      let parsedToken = "";
      console.log(token);

      if (!token) {
        console.warn("No token found in sessionStorage.");
        return;
      }
      if (token) {
        parsedToken = JSON.parse(token);
        console.log(parsedToken, "Parsed Token");
      }
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken}`,
          },

          // withCredentials: true,
        }
      );
      // console.log(res, [...messages, res?.data?.newMessage]);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3 mt-2">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="border text-sm sm:text-lg rounded-lg block w-full p-2 border-zinc-500  bg-zinc-200 text-zinc-800"
        />
        <button
          type="submit"
          className="w-2/12 justify-center absolute flex items-center inset-y-0 end-0  text-zinc-800 hover:text-gray-950 bg-slate-500 rounded-md p-1 "
        >
          {/* <span className=" p-1">Send</span> */}
          <LuSendHorizonal />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
