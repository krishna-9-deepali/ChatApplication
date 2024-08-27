import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      // console.log(res.data, res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    // console.log(user);
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto mt-40">
      <div className="p-6 w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">Signup</h1>
        <form onSubmit={onSubmitHandler} action="" className="text-gray-100 ">
          <div className="my-2">
            <label className="lable p-2">
              <span className="text-base font-medium">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10 text-gray-900"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-2">
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
          <div className="my-2">
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
          <div className="my-2">
            <label className="lable p-2">
              <span className="text-base font-medium">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10 text-gray-900"
              type="password"
              placeholder="Enter your Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center font-medium">
              <p className="px-1">Male :</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2 border-gray-100"
              />
            </div>

            <div className="flex items-center font-medium">
              <p className="px-1">Female :</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2 border-gray-100"
              />
            </div>
          </div>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              login
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-800 "
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
