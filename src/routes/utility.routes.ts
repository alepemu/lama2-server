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

/**
 * Queries the AI model
 * @route POST /ai
 * @param {string} input.body.required - The input text
 * @param {number} typeId.body.required - The type of query
 * @returns {object} 200 - The response object
 */
utilityRouter.post("/ai", async (req: Request, res: Response) => {
  const { input, typeId } = req.body;
  console.log(">>>", input, typeId);
  const output = await queryAI(input, typeId);
  console.log(">>>", output);
  res.status(200).json(output);
});

export default utilityRouter;
