import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

function OtherUsers() {
  //my custom hooks
  useGetOtherUsers();
  const { otherUsers, isSearch, searchUsers } = useSelector(
    (store) => store.user
  );
  if (!otherUsers) return; //early retrun in react.
  const displaySearchedUser = isSearch ? searchUsers : otherUsers;

  return (
    <div className="overflow-auto flex-1">
      {!isSearch
        ? otherUsers?.map((user) => {
            return <OtherUser key={user._id} user={user} />;
          })
        : displaySearchedUser?.map((user) => {
            return <OtherUser key={user._id} user={user} />;
          })}
    </div>
  );
}

export default OtherUsers;
