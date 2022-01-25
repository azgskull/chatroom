import { fetchClient } from "../common/utils";

const sendChat = async (roomName, content) => {
  const { data } = await fetchClient.post(`/rooms/${roomName}/chat`, {
    content,
  });
  return data;
};

const chatApi = {
  sendChat,
};

export default chatApi;
