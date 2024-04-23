import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  console.error(`[error] ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: err.name,
    status: err.statusCode || 500,
    message: err.message || "Something went wrong",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

export default errorHandler;
