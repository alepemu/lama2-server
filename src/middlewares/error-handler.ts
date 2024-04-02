import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error("[error]", err);
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
};

export default errorHandler;
