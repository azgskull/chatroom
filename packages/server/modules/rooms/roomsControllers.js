import roomsServices from "./roomsServices.js";

/**
 * @controller getRooms
 */
const getRooms = (req, res) => {
  const rooms = roomsServices.getRooms();

  res.json(rooms);
};

/**
 * @controller createRoom
 */
const createRoom = (req, res) => {
  const { roomName } = req.body;

  try {
    const room = roomsServices.createRoom(roomName);
    res.json({ room });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

/**
 * @controller getRoom
 */
const getRoom = (req, res) => {
  const { id } = req.mwUser;
  const { name: roomName } = req.mwRoom;
  roomsServices.joinRoom(roomName, id);

  res.json(req.mwRoom);
};

/**
 * @controller joinRoom
 */
const joinRoom = (req, res) => {
  const { id } = req.mwUser;
  const { name: roomName } = req.mwRoom;
  try {
    roomsServices.joinRoom(roomName, id);
    res.json({
      message: "User joined the room",
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * @controller leaveRoom
 */
const leaveRoom = (req, res) => {
  const { id } = req.mwUser;
  const { name: roomName } = req.mwRoom;
  try {
    roomsServices.leaveRoom(roomName, id);
    res.json({
      message: "User left the room",
    });
  } catch (e) {
    req.status(400).json(e.message);
  }
};

/**
 * @Controller send Chat
 */
const sendChat = (req, res) => {
  const user = req.mwUser;
  const { name: roomName } = req.mwRoom;
  const { content } = req.body;

  try {
    roomsServices.sendChat(roomName, user, content);
    res.json({
      message: "The chat is saved",
    });
  } catch (e) {
    res.status(403).json({
      error: e.message,
    });
  }
};

export default {
  getRooms,
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom,
  sendChat,
};
