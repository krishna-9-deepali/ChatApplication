import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import AuthLayout from "./components/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout authentication>
        <Home />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
]);
function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socketio = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        query: { userId: authUser._id },
      });
      // console.log(socketio, "is socket io");
      dispatch(setSocket(socketio));
      socketio?.on("getOnlineUsers", (onlineusers) => {
        dispatch(setOnlineUsers(onlineusers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className="w-full p-4 h-screen flex items-start  justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
