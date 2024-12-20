import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });

    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="my-10 text-center">
      <h1 className="text-bold text-4xl text-white">Connections Requests</h1>
      {requests.map((request, i) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto justify-between"
            key={i}
          >
            <div>
              <img src={photoUrl} className="w-20 h-20 rounded-full" alt="" />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName || ""} {lastName || ""}
              </h2>
              {age && gender && <p>{age + "," + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
