import dayjs from "dayjs";
import { useEffect } from "react";
import useStateSubscription from "../common/useStateSubscribe";
import { loadUsers, usersState } from "../state/users";
import style from "./sideUsers.module.css";

const SideUser = () => {
  const users = useStateSubscription(usersState, (state) => state.list);

  useEffect(() => {
    // move this to app to load it in the start
    loadUsers();
  }, []);

  return (
    <section className={style.wrapper}>
      <h1 className={style.title}>Users online :</h1>
      <ul className={style.list}>
        {users.map(({ username, lastSeen }) => (
          <li key={username}>
            {username} <span>{dayjs(lastSeen).fromNow()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SideUser;
