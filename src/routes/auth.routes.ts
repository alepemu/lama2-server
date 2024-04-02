import { Router } from "express";
import { validate } from "../middlewares/validation";
import { authSignUp, authSignIn } from "../utils/data-validation";
import { signup, signin } from "../controllers/auth.controller";

const authRouter = Router();

/**
 * Signs up a new user
 * @route POST /auth/signup
 * @body {username, email, password}
 */
authRouter.post("/signup", validate(authSignUp), signup);

/**
 * Signs user in
 * @route POST /auth/signin
 * @body {email, password}
 */
authRouter.post("/signin", validate(authSignIn), signin);

export default authRouter;
