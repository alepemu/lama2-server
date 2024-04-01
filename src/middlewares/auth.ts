import { Request, Response, NextFunction } from "express";

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    // const accessToken = req.headers["x-access-token"];
    // ...
    console.log("Auth middleware");
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default auth;
