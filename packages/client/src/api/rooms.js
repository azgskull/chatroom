import { fetchClient } from "../common/utils";

const getRooms = async () => {
  const { data } = await fetchClient.get("/rooms");
  return data;
};

const createRoom = async (roomName) => {
  const { data } = await fetchClient.post("/rooms", { roomName });
  return data;
};

const getRoom = async (roomName) => {
  const { data } = await fetchClient(`/rooms/${roomName}/`);
  return data;
};

const joinRoom = async (roomName) => {
  const { data } = await fetchClient.put(`/rooms/${roomName}/join`);
  return data;
};

const leaveRoom = async (roomName) => {
  const { data } = await fetchClient.put(`/rooms/${roomName}/leave`);
  return data;
};

const roomsApi = {
  getRooms,
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
};

export default roomsApi;
