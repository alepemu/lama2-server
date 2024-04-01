import { Request, Response } from "express";
import { User } from "../models";

const getAllUser = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll();
    const plainUsers = users.map((user) => user.get({ plain: true }));
    res.status(200).json(plainUsers);
  } catch (error) {
    console.error(error);
  }
};

const deleteAllUser = async (_: Request, res: Response) => {
  try {
    await User.destroy({ where: {} });
    res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    // const userData = {
    //   username: `User ${Math.floor(Math.random() * 1000)}`,
    // };
    const userData = req.body;
    const user = await User.create(userData);
    const plainUser = user.get({ plain: true });
    res.status(200).json(plainUser);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
  }
};

export { getAllUser, deleteAllUser, createUser, deleteUser };
