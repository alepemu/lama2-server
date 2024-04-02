import { NextFunction, Request, Response } from "express";
import { User } from "../models";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { email } = userData;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User email already in use" });
      return;
    }
    const user = await User.create(userData);
    const plainUser = user.get({ plain: true });
    res.status(200).json(plainUser);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User email not found" });
      return;
    }
    const plainUser = user.get({ plain: true });
    if (plainUser.password !== password) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    res.status(200).json({ message: "Signin successful" });
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
