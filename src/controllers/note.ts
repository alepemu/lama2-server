import { Request, Response } from "express";
import { Note } from "../models";

const getAllNotes = async (_: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    const plainNotes = notes.map((note) => note.get({ plain: true }));
    res.status(200).json(plainNotes);
  } catch (error) {
    console.error(error);
  }
};

const getAllNotesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notes = await Note.findAll({ where: { userId } });
    const plainNotes = notes.map((note) => note.get({ plain: true }));
    res.status(200).json(plainNotes);
  } catch (error) {
    console.error(error);
  }
};

const updateNoteById = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    const newNoteData = {
      text: "text here updated",
    };
    await Note.update({ ...newNoteData }, { where: { id: noteId } });
    res.status(200).json({ message: "Note updated" });
  } catch (error) {
    console.error(error);
  }
};

const deleteNoteById = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    await Note.destroy({ where: { id: noteId } });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
  }
};

const createNote = async (req: Request, res: Response) => {
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
    console.error(error);
  }
};

export {
  getAllNotes,
  getAllNotesByUserId,
  updateNoteById,
  deleteNoteById,
  createNote,
};
