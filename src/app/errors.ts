import { ErrorRequestHandler, Request, Response } from "express";
import AppError from "../utils/app-error";
import envConfig from "../config/env";
import httpStatus from "http-status";

//* handle development error
const handleDevelopmentError = (
  err: AppError,
  _req: Request,
  res: Response,
) => {
  res.status(err.statusCode).json({
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
    const err = { ...error };

    err.message = error.message;
    err.status = error.status || "error";
    err.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    handleProductionError(err, req, res);
  }
};

export default globalErrorHandler;
