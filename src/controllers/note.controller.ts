import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Note } from "../models";

const getAllNotes = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.findAll({
      order: [["order", "ASC"]],
      attributes: ["id", "typeId", "order", "title", "text", "list", "theme"],
    });
    // Manually delayed response
    setTimeout(() => {
      res.status(200).json(notes);
    }, 1000);
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

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.userId;
    const userId = "d64028b4-5034-4eeb-9ea5-ea4906567535";
    const notes = await Note.findAll({
      where: { userId },
      order: [["order", "ASC"]],
      attributes: ["id", "typeId", "order", "title", "text", "list", "theme"],
    });
    // Manually delayed response
    setTimeout(() => {
      res.status(200).json(notes);
    }, 1000);
  } catch (error) {
    next(error);
  }
};

const updateNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.userId;
    const { order } = req.body;
    // const notes = await Note.findAll({ where: { userId } });
    const notes = await Note.findAll();
    notes.forEach(async (note) => {
      const { id } = note.get({ plain: true });
      const newOrder = order.indexOf(id);
      await Note.update({ order: newOrder }, { where: { id } });
    });
    // Manually delayed response
    setTimeout(() => {
      res.status(200).json({ message: "Notes order updated" });
    }, 1000);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteData = req.body;
    const note = await Note.create({
      userId: "d64028b4-5034-4eeb-9ea5-ea4906567535",
      ...noteData,
    });
    const plainNote = note.get({ plain: true });
    // Update order of the other notes
    const notes = await Note.findAll({
      where: { userId: "d64028b4-5034-4eeb-9ea5-ea4906567535" },
    });
    notes.forEach(async (note) => {
      const { id, order } = note.get({ plain: true });
      await Note.update({ order: order + 1 }, { where: { id } });
    });
    // Manually delayed response
    setTimeout(() => {
      res.status(200).json({ message: "Note created", noteId: plainNote.id });
    }, 1000);
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
    // Manually delayed response
    setTimeout(() => {
      res.status(200).json({ message: "Note updated" });
    }, 1000);
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

    // Delete note
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
      // Manually delayed response
      setTimeout(() => {
        res.status(200).json({ message: "Note deleted" });
      }, 1000);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getAllNotes,
  deleteAllNotes,
  getNotes,
  updateNotes,
  createNote,
  updateNoteById,
  deleteNoteById,
};
