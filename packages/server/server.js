import express from "express";
import http from "http";
import cors from "cors";

import { WebSocketServer } from "ws";
import roomsRouter from "./modules/rooms/roomsRouter.js";
import usersMiddlewares from "./modules/user/usersMiddlewares.js";
import usersRouter from "./modules/user/usersRouters.js";

import socketHandler from "./modules/sockets/socketHandler.js";

import path from "path";

const app = express();
const server = http.createServer(app);

const ws = new WebSocketServer({ server });

ws.on("connection", socketHandler.socketConnection);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersMiddlewares.detectRequestUser);

// Routers
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);

if (process.env.NODE_ENV !== "dev") {
  // serve react
  app.use(express.static("../client/build"));
  app.use("/*", (req, res) => {
    res.sendFile(path.resolve("../client/build/index.html"));
  });
}

server.listen(process.env.PORT || 80);
