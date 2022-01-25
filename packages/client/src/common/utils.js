import axios from "axios";
import { setUser, userState } from "../state/user";

let routerNavigate;

export const configureFetchClient = (navigate) => {
  routerNavigate = navigate;
};

export const fetchClient = axios.create({
  baseURL: "http://localhost:80",
});

fetchClient.interceptors.request.use((config) => {
  const user = userState.get() ?? undefined;
  if (user) {
    return {
      ...config,
      headers: {
        ...config.headers,
        authuser: user.id,
      },
    };
  }

  return config;
});

fetchClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      setUser();
      routerNavigate?.("/");
    }

    return Promise.reject(error);
  }
);
