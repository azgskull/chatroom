import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat/Chat";
import Separator from "../components/Separator";

import style from "./room.module.css";
import useStateSubscription from "../common/useStateSubscribe";
import { clearStateRoom, loadStateRoom, roomState } from "../state/room";
import roomsApi from "../api/rooms";

const Room = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const { loading, error, room } = useStateSubscription(roomState);

  useEffect(() => {
    loadStateRoom(roomName);

    return () => {
      clearStateRoom();
      roomsApi.leaveRoom(roomName);
    };
  }, [roomName]);

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  });

  if (loading || !room) {
    return "Loading";
  }

  return (
    !error && (
      <main className={style.wrapper}>
        <div className={style.header}>
          <Link to="/rooms" className={style.header__link}>
            Rooms
          </Link>
          <span className={style.header_separator}>:</span>
          <h1>{roomName}</h1>
        </div>
        <Separator />
        <Chat />
      </main>
    )
  );
};

export default Room;
