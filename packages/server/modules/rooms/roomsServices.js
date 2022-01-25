import crypto from "crypto";
import socketServices from "../sockets/socketServices.js";
import usersServices from "../user/usersServices.js";

/*

    room = {
        name,
        messages: [
            {
                id,
                message,
                createdAt
            }
        ],
        connectedUsers: [
            id,id...
        ],
        lastUpdate
    }

    rooms = [
        name => room,
        ...
    ]

*/

const rooms = new Map();

rooms.set("Lobby", {
  name: "Lobby",
  messages: [],
  connectedUsers: new Set(),
  lastUpdate: Date.now(),
});

/**
 * @Service createRoom
 */
const createRoom = (roomName) => {
  if (!roomName) {
    throw new Error("Room name is required");
  }

  if (rooms.has(roomName)) {
    throw new Error("A room with this name already exists");
  }

  const room = {
    name: roomName,
    messages: [],
    connectedUsers: new Set(),
    lastUpdate: Date.now(),
  };

  rooms.set(roomName, room);
  return room;
};

/**
 * @Service formatMessage
 */
const formatMessage = (message, userId) => {
  try {
    const user = usersServices.getUser(message.userId);
    return {
      ...message,
      userId: undefined,
      mine: userId === user.id,
      username: user.username,
    };
  } catch (e) {
    return {
      ...message,
      userId: undefined,
      username: "User logged out",
    };
  }
};

/**
 * @Service getRoom
 */
const getRoom = (roomName, authenticatedUser) => {
  if (!rooms.has(roomName)) {
    throw new Error("Room doesn't exists");
  }

  const room = rooms.get(roomName);
  return {
    ...room,
    connectedUsers: [...room.connectedUsers].map((userId) => {
      try {
        const user = usersServices.getUser(userId);
        return {
          username: user.username,
          lastSeen: user.lastSeen,
        };
      } catch (e) {
        return {
          username: "User logged out",
          lastSeen: 0,
        };
      }
    }),

    messages: [...room.messages].map((message) =>
      formatMessage(message, authenticatedUser.id)
    ),
  };
};

/**
 * @Service joinRoom
 */
const joinRoom = (roomName, id) => {
  const room = rooms.get(roomName);

  room.connectedUsers.add(id);
};

/**
 * @Service leaveRoom
 */
const leaveRoom = (roomName, username) => {
  const room = rooms.get(roomName);

  room.connectedUsers.delete(username);
};

/**
 * @Service leaveRoom
 */

const getRooms = () => {
  const reserved = [];
  const common = [];
  rooms.forEach((room) => {
    let destination = common;
    if (room.name === "Lobby") {
      destination = reserved;
    }

    destination.push({
      name: room.name,
      messageCount: room.messages.length,
      connectedCount: room.connectedUsers.size,
      lastUpdate: room.lastUpdate,
    });
  });

  reserved.sort((a, b) => b.lastUpdate - a.lastUpdate);
  common.sort((a, b) => b.lastUpdate - a.lastUpdate);

  return [...reserved, ...common];
};

/**
 * @Service sendChat
 */
const sendChat = (roomName, user, content) => {
  const room = rooms.get(roomName);

  if (room.connectedUsers.has(user.id)) {
    const message = {
      id: crypto.randomBytes(20).toString("hex"),
      content,
      username: user.username,
      userId: user.id,
      creationDate: Date.now(),
    };
    room.messages.push(message);

    [...room.connectedUsers].map((userId) =>
      socketServices.notify([userId], {
        type: "newMessage",
        payload: {
          room: roomName,
          message: formatMessage(message, userId),
        },
      })
    );
  } else {
    throw new Error("User not connected to this room");
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
