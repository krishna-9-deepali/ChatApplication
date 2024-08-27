import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function OtherUser({ user }) {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);
  const dispatch = useDispatch();
  const selectedUseHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUseHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-stone-950" : ""
        } flex gap-2 items-center text-gray-300 hover:bg-zinc-200 hover:text-black rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex justify-between gap-2">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;
