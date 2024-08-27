import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      socket?.on("newMessage", (newMessage) => {
        // console.log(newMessage);
        if (selectedUser?._id === newMessage?.senderId) {
          dispatch(setMessages([...messages, newMessage]));
        }
      });
    } catch (error) {
      console.log(error);
    }

    return () => socket?.off("newMessage");
  }, [setMessages, messages]);
};
export default useGetRealTimeMessage;
