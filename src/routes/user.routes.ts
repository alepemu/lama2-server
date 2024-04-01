import { Router } from "express";
import {
  getAllUser,
  deleteAllUser,
  createUser,
  deleteUser,
} from "../controllers/user.controller";

const userRouter = Router();

/**
 * Get all users
 * @route GET /user/get-all
 */
userRouter.get("/get-all", getAllUser);

/**
 * Delete all users
 * @route DELETE /user/del-all
 */
userRouter.delete("/del-all", deleteAllUser);

/**
 * Create new user
 * @route POST /user/new
 * @body {username, email?, password?}
 */
userRouter.post("/new", createUser);

/**
 * Delete user by id
 * @route DELETE /user/:userId
 * @param {string} userId
 */
userRouter.delete("/:userId", deleteUser);

export default userRouter;
