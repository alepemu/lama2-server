import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import constants from "../constants";

interface RequestWithUserId extends Request {
  userId: string;
}

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers["authorization"];
    console.log(">>> auth", authorization);
    if (authorization) {
      const decoded: JwtPayload = jwt.verify(
        authorization.split(" ")[1],
        constants.jsonWebToken.secret
      ) as JwtPayload;
      console.log(">>>", decoded);
      // req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default auth;
