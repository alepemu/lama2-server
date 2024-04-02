import routes from "express";
import { utilityRouter } from "./routes";
// import { utilityRouter, authRouter, userRouter, noteRouter } from "./routes";

const router = routes.Router();

router.use("/", utilityRouter);
// router.use("/auth", authRouter);
// router.use("/user", userRouter);
// router.use("/notes", noteRouter);

export default router;
