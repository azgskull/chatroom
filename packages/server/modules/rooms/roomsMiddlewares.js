import roomsServices from "./roomsServices.js";

/**
 * @middleware requireRoom
 */
const requireRoom = (req, res, next) => {
  const user = req.mwUser;
  const { roomName } = req.params;

  try {
    const room = roomsServices.getRoom(roomName, user);
    req.mwRoom = room;
    next();
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

export default {
  requireRoom,
};
