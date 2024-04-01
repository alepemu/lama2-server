import routes from "express";
import { bonusRouter, userRouter, noteRouter } from "./routes";

const router = routes.Router();

router.use("/", bonusRouter);
router.use("/user", userRouter);
router.use("/notes", noteRouter);

export default router;
