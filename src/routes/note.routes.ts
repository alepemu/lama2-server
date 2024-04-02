import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { validate } from "../middlewares/validation";
import { notesOrder, notePost, notePut } from "../utils/data-validation";
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

// Authentication middleware add req.userId
noteRouter.use(authenticate);

/**
 * Get all notes from an user
 * @route GET /notes/:userId ***
 * @param {string} userId
 */
noteRouter.get("/all/:userId", getNotesByUserId);

/**
 * Update all notes order
 * @route PUT /notes/:userId ***
 * @param {string} userId
 * @body {order: []}
 */
noteRouter.put("/all/:userId", validate(notesOrder), updateNotesOrder);

/**
 * Create new note
 * @route POST /notes/new
 * @body {typeId, title, text?, list?, userId}
 */
noteRouter.post("/new", validate(notePost), createNote);

/**
 * Update note
 * @route PUT /notes/:noteId
 * @body {title?, text?, list?, theme?}
 */
noteRouter.put("/:noteId", validate(notePut), updateNoteById);

/**
 * Delete note
 * @route DELETE /notes/:noteId
 */
noteRouter.delete("/:noteId", deleteNoteById);

export default noteRouter;
