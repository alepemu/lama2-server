import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import constants from "../constants";
import { User } from "../models";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(409).json({ message: "User email already in use" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash });
    res.status(200).json({ message: "User created" });
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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, constants.jsonWebToken.secret, {
      expiresIn: "1h",
    });
    console.log(token);

    res.status(200).json({ message: "Signed in" });
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
