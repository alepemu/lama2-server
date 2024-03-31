import routes, { Request, Response } from "express";
import { queryAI } from "./services/ai";

import {
  getAllUser,
  deleteAllUser,
  createUser,
  deleteUser,
} from "./controllers/user";

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

// User routes
router.get("/user/get-all", getAllUser);
router.get("/user/new", createUser);
router.delete("/user/del-all", deleteAllUser);
router.delete("/user/del/:userId", deleteUser);

// Note routes
// router.get("/notes", getAllNotes);
// router.post("/notes", createNote);
// router.put("/notes", updateNotesOrder);
// router.put("/notes/:noteId", updateNoteById);
// router.delete("/notes/:noteId", deleteNoteById);

export default router;
