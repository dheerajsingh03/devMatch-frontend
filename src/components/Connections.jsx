import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections.data.data));
      console.log(connections);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;
  console.log(connections);

  return (
    <div className="my-10 text-center">
      <h1 className="text-bold text-4xl text-white">Connections</h1>
      {connections.map((connection, i) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
