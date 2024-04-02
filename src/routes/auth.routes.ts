import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";

const authRouter = Router();

/**
 * Signs up a new user
 * @route POST /auth/signup
 * @body {username, email, password}
 */
authRouter.post("/signup", signup);

/**
 * Signs user in
 * @route POST /auth/signin
 * @body {email, password}
 */
authRouter.post("/signin", signin);

export default authRouter;
