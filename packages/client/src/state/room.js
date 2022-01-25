import roomsApi from "../api/rooms";
import StateFactory from "../common/State";

export const roomState = StateFactory({
  loading: true,
  room: null,
  error: false,
});

// handlers
export const clearStateRoom = () => {
  roomState.set({
    room: null,
    loading: false,
    error: false,
  });
};

export const loadStateRoom = async (roomName) => {
  roomState.set({
    room: null,
    loading: true,
    error: false,
  });

  try {
    const room = await roomsApi.getRoom(roomName);

    roomState.set({
      loading: false,
      room,
      error: false,
    });
  } catch (e) {
    roomState.set({
      room: null,
      loading: false,
      error: true,
    });
  }
};

// append msg
export const appendChat = async (roomName, message) => {
  const { room } = roomState.get();
  if (room && room.name === roomName && !room.loading) {
    roomState.set((old) => ({
      ...old,
      room: {
        ...old.room,
        messages: [...old.room.messages, message],
      },
    }));
  }
};
