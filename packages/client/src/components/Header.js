import { Link } from "react-router-dom";
import useStateSubscription from "../common/useStateSubscribe";
import { userState, logoutUser } from "../state/user";
import style from "./header.module.css";

const Header = () => {
  const user = useStateSubscription(userState);

  return (
    <div className={style.header}>
      <h1 className={style.logo}>
        <Link to="/">Chatroom</Link>
      </h1>
      {user && (
        <ul className={style.menu}>
          <li className={style.welcome}>
            Welcome <strong>{user.username}</strong>
          </li>
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
