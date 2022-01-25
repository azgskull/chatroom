import usersServices from "./usersServices.js";

/**
 * @middleware detectRequestUser
 */
const detectRequestUser = (req, res, next) => {
  const { authuser } = req.headers;

  try {
    const user = usersServices.getUser(authuser);

    usersServices.refreshUserLastSeen(user.id);

    req.mwUser = user;
  } catch (e) {
    //
  }

  next();
};

/**
 * @middleware authenticated
 */
const authenticated = (req, res, next) => {
  const { mwUser } = req;

  if (!mwUser) {
    return res.status(401).json({
      error: "You should be authenticated",
    });
  }

  next();
};

export default {
  detectRequestUser,
  authenticated,
};
