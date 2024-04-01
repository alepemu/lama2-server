import { NextFunction, Request, Response } from "express";
import { User } from "../models";

const signup = async (_: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Signup");
  } catch (error) {
    next(error);
  }
};

const signin = async (_: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Signin");
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
