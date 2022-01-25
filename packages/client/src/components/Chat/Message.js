import dayjs from "dayjs";

import style from "./message.module.css";

const Message = ({ content, mine, username, creationDate }) => {
  const classNames = [style.wrapper];

  if (mine) {
    classNames.push(style.mine);
  }

  return (
    <div className={classNames.join(" ")}>
      <div className={style.info}>
        <div className={style.username}>{username}</div>
        <span className={style.creationDate}>
          {dayjs(creationDate).fromNow()}
        </span>
      </div>
      <p className={style.message}>{content}</p>
    </div>
  );
};

export default Message;
