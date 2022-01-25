import crypto from "crypto";

const users = new Map();
const users_usernameId = new Map();

/**
 * @Service addUser
 */
const addUser = (username) => {
  if (!username) {
    throw new Error("Username is required");
  }

  if (users_usernameId.has(username)) {
    throw new Error("Username already exists");
  }

  const id = crypto.randomBytes(20).toString("hex");

  const user = {
    id,
    username,
    lastSeen: Date.now(),
  };

  users_usernameId.set(username, id);
  users.set(id, user);

  return user;
};

/**
 * @Service deleteUser
 */
const deleteUser = (userId) => {
  const user = users.get(userId);

  if (user) {
    users_usernameId.delete(user.username);
    users.delete(userId);
  }
};

/**
 * @Service getUser
 */
const getUser = (id) => {
  const user = users.get(id);

  if (!user) {
    throw new Error("User doesn't exists");
  }

  return user;
};

/**
 * @Service getUsers
 */
const getUsers = () => {
  const usersResponse = [];
  users.forEach((user) =>
    usersResponse.push({
      username: user.username,
      lastSeen: user.lastSeen,
    })
  );

  return usersResponse.sort((a, b) => b.lastSeen - a.lastSeen);
};

/**
 * @service refreshUserLastSeen
 */
const refreshUserLastSeen = (id) => {
  const user = getUser(id);
  user.lastSeen = Date.now();
};

export default {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  refreshUserLastSeen,
};
