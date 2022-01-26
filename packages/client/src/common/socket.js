import { appendChat } from "../state/room";
import { userState } from "../state/user";

const socket = new window.WebSocket(process.env.REACT_APP_WS);

export const registerUser = () => {
  const user = userState.get();
  if (user && user.id) {
    socket.send(
      JSON.stringify({
        type: "register",
        payload: {
          userId: user.id,
        },
      })
    );
  }
};

socket.onmessage = (msg) => {
  const request = JSON.parse(msg.data);
  switch (request.type) {
    case "newMessage":
      appendChat(request.payload.room, request.payload.message);
      break;
    default:
      break;
  }
  console.log(request);
};

socket.onopen = () => {
  registerUser();
};
