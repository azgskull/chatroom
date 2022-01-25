const sockets = new Map();

const addSocket = (userId, socket) => {
  sockets.set(userId, socket);
};

const removeSocket = (userId) => {
  sockets.delete(userId);
};

const getSocket = (userId) => {
  return sockets.get(userId);
};

const getSockets = () => {
  return sockets.forEach((socket) => socket);
};

const notify = (users, message) => {
  users.map((userId) => {
    const socket = getSocket(userId);
    socket.send(JSON.stringify(message));
  });
};

export default {
  addSocket,
  removeSocket,
  getSocket,
  getSockets,
  notify,
};
