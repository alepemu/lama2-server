import { Router } from "express";
import {
  getAllNotes,
  getAllNotesByUserId,
  createNote,
  updateNoteById,
  deleteNoteById,
} from "../controllers/note.controllers";

const noteRouter = Router();

noteRouter.get("/", getAllNotes);
noteRouter.get("/:userId", getAllNotesByUserId);
noteRouter.get("/new", createNote);
// noteRouter.put("/", updateNotesOrder);
noteRouter.put("/:noteId", updateNoteById);
noteRouter.delete("/:noteId", deleteNoteById);

export default noteRouter;
