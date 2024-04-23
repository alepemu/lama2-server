import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";

import constants from "../constants";
import { Note } from "../models";

const getAllNotes = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.findAll({
      order: [["order", "ASC"]],
      attributes: ["id", "typeId", "order", "title", "text", "list", "theme"],
    });
    res.status(200).json(notes);
  } catch (error: any) {
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
  } catch (error: any) {
    next(error);
  }
};

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.userId;
    const userId = constants.admin.userId;
    const notes = await Note.findAll({
      where: { userId },
      order: [["order", "ASC"]],
      attributes: ["id", "typeId", "order", "title", "text", "list", "theme"],
    });
    setTimeout(() => {
      res.status(200).json(notes);
    }, 1000);
  } catch (error: any) {
    next(error);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteData = req.body;
    const note = await Note.create({
      userId: constants.admin.userId,
      ...noteData,
    });
    const noteId = note.get("id");
    // Update order of the other notes
    const notes = await Note.findAll({
      where: { userId: constants.admin.userId },
    });
    notes.forEach(async (note) => {
      const { id, order } = note.get({ plain: true });
      await Note.update({ order: order + 1 }, { where: { id } });
    });
    //
    setTimeout(() => {
      res.status(200).json({ message: "Note created", noteId });
    }, 1000);
  } catch (error: any) {
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
    setTimeout(() => {
      res.status(200).json({ message: "Note updated" });
    }, 1000);
  } catch (error: any) {
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
    const note = await Note.findOne({ where: { id: noteId } });
    if (note) {
      const position = note.order;
      await Note.destroy({ where: { id: noteId } });
      // Update notes order (only the affected ones)
      await Note.findAll({ where: { order: { [Op.gt]: position } } }).then(
        (notes) => {
          notes.forEach(async (note) => {
            const { id, order } = note.get({ plain: true });
            await Note.update({ order: order - 1 }, { where: { id } });
          });
        }
      );
      //
      setTimeout(() => {
        res.status(200).json({ message: "Note deleted" });
      }, 1000);
    }
  } catch (error: any) {
    next(error);
  }
};

const updateNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.userId;
    const userId = constants.admin.userId;
    const { order } = req.body;
    const notes = await Note.findAll({ where: { userId } });
    notes.forEach(async (note) => {
      const { id } = note.get({ plain: true });
      const newOrder = order.indexOf(id);
      await Note.update({ order: newOrder }, { where: { id } });
    });
    setTimeout(() => {
      res.status(200).json({ message: "Notes order updated" });
    }, 1000);
  } catch (error: any) {
    next(error);
  }
};

export {
  getAllNotes,
  deleteAllNotes,
  getNotes,
  createNote,
  updateNoteById,
  deleteNoteById,
  updateNotes,
};
