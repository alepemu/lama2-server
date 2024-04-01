import { Router, Request, Response } from "express";
import { queryAI } from "../services/ai";

const utilityRouter = Router();

/**
 * Checks if the server is up
 * @route GET /health
 */
utilityRouter.get("/health", (_, res: Response) => {
  res.send("Hello World!");
});

utilityRouter.post("/ai", async (req: Request, res: Response) => {
  console.log(req.body);
  const { input, typeId } = req.body;
  const output = await queryAI(input, typeId);

  console.log(">>>", output);
  res.status(200).json(output);
});

export default utilityRouter;
