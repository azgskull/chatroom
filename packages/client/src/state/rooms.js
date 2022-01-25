import roomsApi from "../api/rooms";
import StateFactory from "../common/State";

export const roomsState = StateFactory({
  fetching: false,
  list: [],
});

//handlers

/**
 * @handler loadRooms
 */
export const loadRooms = async () => {
  roomsState.set((state) => ({
    ...state,
    fetching: true,
  }));

  let rooms;

  try {
    rooms = await roomsApi.getRooms();
  } catch (e) {
    rooms = [];
  }

  roomsState.set((state) => ({
    ...state,
    fetching: false,
    list: rooms.length ? rooms : state.list,
  }));
};
