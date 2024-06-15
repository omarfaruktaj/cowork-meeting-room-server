import { ErrorRequestHandler, Request, Response } from "express";
import AppError from "../utils/app-error";
import envConfig from "../config/env";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import mongoose from "mongoose";

//* handle zod error
const handleZodError = (err: ZodError) => {
  const errorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: String(issue?.path[issue.path.length - 1]),
      message: issue.message,
    };
  });

  return new AppError(
    "Validation Error",
    httpStatus.BAD_REQUEST,
    errorMessages,
  );
};

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorMessages = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return new AppError(
    "Validation Error",
    httpStatus.BAD_REQUEST,
    errorMessages,
  );
};

//* handle development error
const handleDevelopmentError = (
  err: AppError,
  _req: Request,
  res: Response,
) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

//* handle production error
const handleProductionError = (err: AppError, _req: Request, res: Response) => {
  //? trusted error send error message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      //? My preference
      /**
       * status: err.status,
       * message: err.message,
       * errorMessages: err.errorMessages,
       */

      //* Assignment requirement
      success: false,
      message: err.message,
      errorMessages: err.errorMessages,
      stack: err.stack,
    });
  }

  //! not trusted don't shear sensitive message
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went very wrong!",
  });
};

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  const nodeEnv = envConfig.get("NODE_ENV");

  if (nodeEnv == "development") {
    handleDevelopmentError(error, req, res);
  } else if (nodeEnv == "production") {
    let err = { ...error };

    err.message = error.message;
    err.status = error.status || "error";
    err.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    if (error instanceof ZodError) err = handleZodError(error);
    if (error?.name === "ValidationError") err = handleValidationError(error);

    handleProductionError(err, req, res);
  }
};

export default globalErrorHandler;
