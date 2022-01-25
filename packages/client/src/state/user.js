import userApi from "../api/user";
import { registerUser } from "../common/socket";
import State from "../common/State";

const getPersistedUser = () => {
  // check localstorage
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.id && user.username) {
      return user;
    }

    throw new Error("User not valid");
  } catch (e) {
    clearUser();
    return;
  }
};

const persistUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem("user");
};

///
//State
export const userState = State(getPersistedUser());

// State handlers
export const setUser = (user) => {
  if (user) {
    persistUser(user);
  } else {
    clearUser();
  }

  userState.set(user);
  registerUser();
};

export const logoutUser = async () => {
  try {
    await userApi.logout();
    setUser();
  } catch (e) {
    console.log(e);
  }
};
