import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div style={{ color: "transparent" }} className="">
      <h1 className="text-white font-serif font-bold text-center m-5 text-3xl">
        Chat-App
      </h1>
      <div className="w-full flex sm:h-[450px] md:h-[550px] h-[450px] rounded-lg overflow-hidden bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-pink-100">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
