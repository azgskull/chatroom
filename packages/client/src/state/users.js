import userApi from "../api/user";
import State from "../common/State";

export const usersState = State({
  fetching: false,
  list: [],
});

export const loadUsers = async () => {
  usersState.set((state) => ({
    ...state,
    fetching: true,
  }));

  let users;

  try {
    users = await userApi.getUsers();
  } catch (e) {
    users = [];
  }

  usersState.set((state) => ({
    ...state,
    fetching: false,
    list: users.length ? users : state.list,
  }));
};
