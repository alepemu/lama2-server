import routes, { Request, Response } from "express";
import { queryAI } from "./services/ai";

import sequelize from "./config/db";

import { getAllUser, deleteAllUser, createUser } from "./controllers/user";

const router = routes.Router();

router.get("/health", (_, res: Response) => {
  res.send("Hello World!");
});

router.post("/ai", async (req: Request, res: Response) => {
  console.log(req.body);
  const { input, typeId } = req.body;
  const output = await queryAI(input, typeId);

  console.log(">>>", output);
  res.status(200).json(output);
});

router.get("/test", async (req: Request, res: Response) => {
  try {
    const schemas = await sequelize.getQueryInterface().showAllSchemas();
    console.log(schemas);
    res.status(200).json(schemas);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user/get-all", getAllUser);
router.get("/user/new", createUser);
router.get("/user/del-all", deleteAllUser)

export default router;
