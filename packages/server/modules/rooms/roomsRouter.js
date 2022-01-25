import { Router } from "express";
import usersMiddlewares from "../user/usersMiddlewares.js";
import roomsControllers from "./roomsControllers.js";
import roomsMiddlewares from "./roomsMiddlewares.js";

const roomsRouter = Router();

// Should be authenticated to access these routes
roomsRouter.use(usersMiddlewares.authenticated);

/**
 * @Route / get all rooms
 */
roomsRouter.get("/", roomsControllers.getRooms);
/**
 * @Route / create a room
 */
roomsRouter.post("/", roomsControllers.createRoom);

/**
 * @Route getRoom
 */
roomsRouter.get(
  "/:roomName/",
  roomsMiddlewares.requireRoom,
  roomsControllers.getRoom
);

/**
 * @Route joinRoom
 */
roomsRouter.put(
  "/:roomName/join",
  roomsMiddlewares.requireRoom,
  roomsControllers.joinRoom
);

/**
 * @Route leaveRoom
 */
roomsRouter.put(
  "/:roomName/leave",
  roomsMiddlewares.requireRoom,
  roomsControllers.leaveRoom
);

/**
 * @Route sendChat
 */
roomsRouter.post(
  "/:roomName/chat",
  roomsMiddlewares.requireRoom,
  roomsControllers.sendChat
);

export default roomsRouter;
