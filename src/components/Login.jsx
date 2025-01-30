import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("dheeraj@gmail.com");
  const [password, setPassword] = useState("Dheeraj@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

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
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId: email,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data === "Invalid Creditential")
        throw new Error("Invalid Creditential");
      dispatch(addUser(res.data.data));
      

      return navigate("/");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <div className="flex justify-center my-[6rem]">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          {isSignUp ? (
            <h2 className="card-title justify-center">Sign Up</h2>
          ) : (
            <h2 className="card-title justify-center">Login</h2>
          )}
          <div>
            {isSignUp && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
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
          {isSignUp ? (
            <p className="flex justify-center">
              Have an Account?
              <span
                onClick={() => handleToggle()}
                className="text-blue-600 cursor-pointer"
              >
                {" "}
                Login
              </span>
            </p>
          ) : (
            <p className="flex justify-center">
              New to DevTinder?
              <span
                onClick={() => handleToggle()}
                className="text-blue-600 cursor-pointer"
              >
                {" "}
                Sign Up
              </span>
            </p>
          )}
          <div className="card-actions justify-center m-2">
            {isSignUp ? (
              <button
                className="btn btn-primary"
                onClick={() => handleSignUp()}
              >
                Sign Up
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
