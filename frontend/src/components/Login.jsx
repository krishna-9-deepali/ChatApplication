import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { login } from "../redux/authSlice";
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(login());
      navigate("/");
      // console.log(res.data, "is object of user");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message, error);
    }
    // console.log(user);
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto mt-40">
      <div className="p-6 w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center text-gray-300">Login</h1>
        <form onSubmit={onSubmitHandler} action="" className="text-gray-100 ">
          <div className="my-4">
            <label className="lable p-2">
              <span className="text-base font-medium">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10 text-gray-900"
              type="text"
              placeholder="Enter your Username"
            />
          </div>
          <div className="my-4">
            <label className="lable p-2">
              <span className="text-base font-medium">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10 text-gray-900"
              type="password"
              placeholder="Enter your Password"
            />
          </div>

          <p className="text-center my-2">
            Don't have an account?
            <Link to="/signup" className="underline">
              signup
            </Link>
          </p>
          <div className="my-1">
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-800 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
