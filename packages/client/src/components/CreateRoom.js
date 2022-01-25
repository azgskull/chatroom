import Modal from "./Modal";

import style from "./createRoom.module.css";
import { useState } from "react";
import roomsApi from "../api/rooms";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ onClose }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [roomName, setRoomName] = useState("");

  const createRoomHandler = async (e) => {
    e.preventDefault();

    try {
      await roomsApi.createRoom(roomName);
      setError("");
      onClose();
      navigate(`/rooms/${roomName}`);
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  const onChangeHandler = (e) => {
    setRoomName(e.target.value);
    setError("");
  };

  return (
    <Modal
      title="Create a room"
      labelProceed="Create"
      onClose={onClose}
      onProceed={createRoomHandler}
    >
      <form onSubmit={createRoomHandler}>
        <input
          className={style.roomName}
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={onChangeHandler}
        />
        {error && <p className={style.error}>{error}</p>}
      </form>
    </Modal>
  );
};

export default CreateRoom;
