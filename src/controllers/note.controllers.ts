import { NextFunction, Request, Response } from "express";
import { Note } from "../models";

const getAllNotes = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.findAll();
    const plainNotes = notes.map((note) => note.get({ plain: true }));
    res.status(200).json(plainNotes);
  } catch (error) {
    next(error);
  }
};

const getAllNotesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const notes = await Note.findAll({ where: { userId } });
    const plainNotes = notes.map((note) => note.get({ plain: true }));
    res.status(200).json(plainNotes);
  } catch (error) {
    next(error);
  }
};

const updateNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { noteId } = req.params;
    const newNoteData = {
      text: "text here updated",
    };
    await Note.update({ ...newNoteData }, { where: { id: noteId } });
    res.status(200).json({ message: "Note updated" });
  } catch (error) {
    next(error);
  }
};

const deleteNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { noteId } = req.params;
    await Note.destroy({ where: { id: noteId } });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteData = {
      typeId: 0,
      order: 0,
      title: "New Note B",
      text: "text here",
      userId: "b8b3b659-bfc0-4c96-a870-08a6f33d3f2e",
    };
    const note = await Note.create(noteData);
    const plainNote = note.get({ plain: true });
    res.status(200).json(plainNote);
  } catch (error) {
    next(error);
  }
};

export {
  getAllNotes,
  getAllNotesByUserId,
  updateNoteById,
  deleteNoteById,
  createNote,
};
