import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue, ZodTypeAny } from "zod";

export function validate(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
