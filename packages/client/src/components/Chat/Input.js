import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import chatApi from "../../api/chat";
import style from "./input.module.css";

const ChatInput = () => {
  const { roomName } = useParams();
  const [content, setContent] = useState("");

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const sendChatHandler = (e) => {
    e.preventDefault();
    setContent("");
    chatApi.sendChat(roomName, content);
  };

  return (
    <form className={style.wrapper} onSubmit={sendChatHandler}>
      <input
        className={style.message}
        placeholder="Message"
        value={content}
        onChange={contentChangeHandler}
      />
      <button type="submit" className={style.button}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;
