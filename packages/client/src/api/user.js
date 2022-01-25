import { fetchClient } from "../common/utils";

const login = async (username) => {
  const { data } = await fetchClient.post("/users/login", { username });
  return data;
};

const logout = async () => {
  const { data } = await fetchClient.post("/users/logout");
  return data;
};

const getUsers = async () => {
  const { data } = await fetchClient.get("/users/");
  return data;
};

const userApi = {
  login,
  logout,
  getUsers,
};

export default userApi;
