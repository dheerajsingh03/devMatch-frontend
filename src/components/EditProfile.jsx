import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);

  const [lastName, setLastName] = useState(user.lastName);

  const [photoUrl, setPhotoUrl] = useState(user.photoUrl||"");

  const [age, setAge] = useState(user.age || "");

  const [gender, setGender] = useState(user.gender||"");

  const [about, setAbout] = useState(user.about||"");

  const [errors, setError] = useState("");

  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center my-10 ">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo Url</span>
                  </div>
                  <input
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
                <p className="text-red-600">{errors}</p>
              </div>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved Successfuly</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
