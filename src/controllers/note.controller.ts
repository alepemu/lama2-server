import { NextFunction, Request, Response } from "express";
import { Note } from "../models";
import sequelize from "../config/db";

const getAllNotes = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.findAll();
    const plainNotes = notes.map((note) => note.get({ plain: true }));
    res.status(200).json(plainNotes);
  } catch (error) {
    next(error);
  }
};

const deleteAllNotes = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Note.destroy({ where: {} });
    res.status(200).json({ message: "All notes deleted" });
  } catch (error) {
    next(error);
  }
};

const getNotesByUserId = async (
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

const updateNotesOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { order } = req.body;
    const notes = await Note.findAll({ where: { userId } });
    notes.forEach(async (note) => {
      const { id } = note.get({ plain: true });
      const newOrder = order.indexOf(id);
      await Note.update({ order: newOrder }, { where: { id } });
    });
    res.status(200).json({ message: "Notes order updated" });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteData = req.body;
    const note = await Note.create(noteData);
    const plainNote = note.get({ plain: true });
    res.status(200).json(plainNote);
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
    const newNoteData = req.body;
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

export {
  getAllNotes,
  deleteAllNotes,
  getNotesByUserId,
  updateNotesOrder,
  createNote,
  updateNoteById,
  deleteNoteById,
};
