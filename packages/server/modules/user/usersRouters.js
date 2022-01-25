import { Router } from "express";
import usersControllers from "./usersControllers.js";

const usersRouter = Router();

/**
 * @route /
 */
usersRouter.get("/", usersControllers.getUsers);

/**
 * @route /login
 */
usersRouter.post("/login", usersControllers.login);

/**
 * @route /logout
 */
usersRouter.post("/logout", usersControllers.logout);

export default usersRouter;
