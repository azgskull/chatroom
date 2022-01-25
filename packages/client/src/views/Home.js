import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/user";

import { setUser } from "../state/user";
import style from "./home.module.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await userApi.login(username);
      // setError("");
      setUser(user);
      navigate("/rooms");
    } catch (e) {
      setError(e.response?.data?.error);
    }
  };

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={(e) => onSubmit(e)}>
        <label className={style.label}>Please choose a username</label>
        <input
          className={style.inputUsername}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Home;
