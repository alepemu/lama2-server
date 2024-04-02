import { Router } from "express";
import auth from "../middlewares/auth";
import {
  getAllNotes,
  deleteAllNotes,
  getNotesByUserId,
  updateNotesOrder,
  createNote,
  updateNoteById,
  deleteNoteById,
} from "../controllers/note.controller";

const noteRouter = Router();

noteRouter.use(auth);

/**
 * Get all notes
 * @route GET /notes/get-all
 */
noteRouter.get("/get-all", getAllNotes);

/**
 * Delete all notes
 * @route DELETE /notes/del-all
 */
noteRouter.delete("/del-all", deleteAllNotes);

/**
 * Get all notes from an user
 * @route GET /notes/:userId
 * @param {string} userId
 */
noteRouter.get("/all/:userId", getNotesByUserId);

/**
 * Update all notes order
 * @route PUT /notes/:userId
 * @param {string} userId
 * @body {order: []}
 */
noteRouter.put("/all/:userId", updateNotesOrder);

/**
 * Create new note
 * @route POST /notes/new
 * @body {typeId, title, text?, list?, userId}
 */
noteRouter.post("/new", createNote);

/**
 * Update note
 * @route PUT /notes/:noteId
 * @body {title?, text?, list?, theme?}
 */
noteRouter.put("/:noteId", updateNoteById);

/**
 * Delete note
 * @route DELETE /notes/:noteId
 */
noteRouter.delete("/:noteId", deleteNoteById);

export default noteRouter;
