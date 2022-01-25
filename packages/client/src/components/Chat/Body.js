import { useEffect, useRef } from "react";
import useStateSubscription from "../../common/useStateSubscribe";
import { roomState } from "../../state/room";

import style from "./body.module.css";
import Message from "./Message";

const Body = () => {
  const ref = useRef();

  const messages = useStateSubscription(
    roomState,
    (state) => state.room?.messages
  );

  useEffect(() => {
    if (ref.current.scrollTop > 0) {
      ref.current.scrollTo({
        top: 0,
      });
    }
    console.log(ref.current.scrollTop);
  });

  if (!messages) return null;

  return (
    <div ref={ref} className={style.scrollWrapper}>
      <div className={style.wrapper}>
        {messages.map((message) => (
          <Message
            key={message.id}
            mine={message.mine}
            username={message.username}
            creationDate={message.creationDate}
            content={message.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
