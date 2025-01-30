import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id } = user;

  const sendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="flex justify-center m-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user?.photoUrl} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {user?.age && user?.gender && <p>{`${user?.age} ${user?.gender}`}</p>}
          <p>{user?.about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
