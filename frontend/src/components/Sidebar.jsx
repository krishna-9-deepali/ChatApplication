import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setIsSearch,
  setOnlineUsers,
  setOtherUsers,
  setSearchUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setSocket } from "../redux/socketSlice";
import { setMessages } from "../redux/messageSlice";
import { logout } from "../redux/authSlice";
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`
      );
      navigate("/login");
      toast.success(res.data.message);
      dispatch(logout());
      dispatch(setAuthUser(null));
      dispatch(setSocket(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
      dispatch(setOnlineUsers(null));
      dispatch(setSearchUsers(null));
      dispatch(setIsSearch(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    // if (search === "") {
    //   dispatch(setIsSearch(false));
    // }
    const filteredUser = otherUsers?.filter((user) =>
      user.fullName.includes(search)
    );
    // console.log(filteredUser);
    if (filteredUser.length !== 0) {
      dispatch(setSearchUsers(filteredUser));
      dispatch(setIsSearch(true));
    } else {
      toast.error("User not found");
    }

    // console.log(filteredUser);
  };
  return (
    <div className="w-1/2 border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        className="w-full flex items-center gap-2"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch((pre) => (pre = e.target.value))}
          className=" w-full input p-1 input-bordered rounded-md text-gray-800"
          placeholder=" search... "
        />
        <button type="submit" className="btn">
          <BiSearchAlt2 size="24px" />
        </button>
      </form>
      <div className="divider px-3 my-0"></div>
      <OtherUsers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
