import { Router } from "express";
import {
  getAllUser,
  deleteAllUser,
  createUser,
  deleteUser,
} from "../controllers/user.controllers";

const userRouter = Router();

/**
 * Get all users
 * @route GET /user/get-all
 */
userRouter.get("/get-all", getAllUser);
userRouter.get("/new", createUser);
userRouter.delete("/del-all", deleteAllUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
