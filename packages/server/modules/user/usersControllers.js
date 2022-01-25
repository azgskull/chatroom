import usersServices from "./usersServices.js";

/**
 * @controller Login
 */
const login = (req, res) => {
  const { username } = req.body;
  let user;

  try {
    user = usersServices.addUser(username);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }

  res.json({
    message: `You are logged as ${username}`,
    user,
  });
};

/**
 * @controller logout
 */
const logout = (req, res) => {
  const { authuser } = req.headers;

  try {
    usersServices.deleteUser(authuser);
  } catch (e) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

  res.json({
    message: `You are logged off`,
  });
};

/**
 * @controller getUsers
 */
const getUsers = (req, res) => {
  res.json(usersServices.getUsers());
};

export default {
  login,
  logout,
  getUsers,
};
