import socketServices from "./socketServices.js";

const socketConnection = (socket) => {
  socket.on("message", (message) => {
    const request = JSON.parse(message);
    switch (request.type) {
      case "register":
        socketServices.addSocket(request.payload.userId, socket);
        break;
    }
  });
};

export default {
  socketConnection,
};
