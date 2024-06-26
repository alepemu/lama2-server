import { NextFunction, Request, Response } from "express";
import { User } from "../models";

const getAllUser = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    const plainUsers = users.map((user) => user.get({ plain: true }));
    res.status(200).json(plainUsers);
  } catch (error) {
    next(error);
  }
};

const deleteAllUser = async (_: Request, res: Response, next: NextFunction) => {
  try {
    await User.destroy({ where: {} });
    res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export { getAllUser, deleteAllUser, deleteUser };
