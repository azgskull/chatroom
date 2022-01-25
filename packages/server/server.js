import express from "express";
import http from "http";
import cors from "cors";

import { WebSocketServer } from "ws";
import roomsRouter from "./modules/rooms/roomsRouter.js";
import usersMiddlewares from "./modules/user/usersMiddlewares.js";
import usersRouter from "./modules/user/usersRouters.js";

import socketHandler from "./modules/sockets/socketHandler.js";

const app = express();
const server = http.createServer(app);

const ws = new WebSocketServer({ server });

ws.on("connection", socketHandler.socketConnection);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersMiddlewares.detectRequestUser);

// Routers
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);

//
app.use((req, res) => {
  res.status(404).send("<h1>Chatroom api :)</h1><p>Root not found</p>");
});

server.listen(80);
