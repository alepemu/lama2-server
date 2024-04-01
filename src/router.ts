import routes, { Request, Response } from "express";
import { queryAI } from "./services/ai";

import { userRouter, noteRouter } from "./routes";

const router = routes.Router();

router.get("/health", (_, res: Response) => {
  res.send("Hello World!");
});

router.use("/user", userRouter);
router.use("/notes", noteRouter);

router.post("/ai", async (req: Request, res: Response) => {
  console.log(req.body);
  const { input, typeId } = req.body;
  const output = await queryAI(input, typeId);

  console.log(">>>", output);
  res.status(200).json(output);
});

export default router;
