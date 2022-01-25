import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStateSubscription from "../common/useStateSubscribe";
import CreateRoom from "../components/CreateRoom";
import { loadRooms, roomsState } from "../state/rooms";

import style from "./rooms.module.css";

const Rooms = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const rooms = useStateSubscription(roomsState, (state) => state.list);

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <>
      <main className={style.wrapper}>
        <div className={style.header}>
          <h1 className={style.title}>Rooms list :</h1>
          <div className={style.action}>
            <button
              onClick={() => {
                setShowCreateRoom(true);
              }}
            >
              Create a room
            </button>
          </div>
        </div>

        <ul className={style.rooms}>
          {rooms.map((room) => (
            <li key={room.name}>
              <Link to={`/rooms/${room.name}`}>
                <span className={style.roomName}>{room.name}</span>
                <div className={style.roomMore}>
                  <span className={style.roomConnected}>
                    {room.connectedCount} connected
                  </span>
                  <span className={style.roomMessages}>
                    {room.messageCount} messages
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      {showCreateRoom && (
        <CreateRoom onClose={() => setShowCreateRoom(false)} />
      )}
    </>
  );
};

export default Rooms;
