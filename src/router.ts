import routes, { Express, Request, Response } from "express";
import { queryAI } from "./services/ai";

const router = routes.Router();

router.get("/health", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/ai", async (req: Request, res: Response) => {
  console.log(req.body);
  const { input, typeId } = req.body;
  const output = await queryAI(input, typeId);

  console.log(">>>", output);
  res.status(200).json(output);
});

export default router;
