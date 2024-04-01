import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";

const authRouter = Router();

/**
 * Signs up a new user
 * @route POST /auth/signup
 */
authRouter.post("/signup", signup);

/**
 * Signs user in
 * @route POST /auth/signin
 */
authRouter.post("/signin", signin);

export default authRouter;
