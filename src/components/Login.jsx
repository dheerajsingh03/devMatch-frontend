import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("dheeraj@gmail.com");

  const [password, setPassword] = useState("Dheeraj@123");

  const [errors, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      
      if (res.data === "Invalid Creditential")
        throw new Error("Invalid Creditential");
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <div className="flex justify-center my-[6rem]">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <p className="text-red-600">{errors}</p>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
