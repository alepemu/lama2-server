import { Router } from "express";
import {
  getAllUser,
  deleteAllUser,
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
 * Delete user by id
 * @route DELETE /user/:userId
 * @param {string} userId
 */
userRouter.delete("/:userId", deleteUser);

export default userRouter;
