import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import AppError from "../utils/app-error";
import httpStatus from "http-status";

const validateMongoDBId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id || !Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid MongoDB ID", httpStatus.BAD_REQUEST));
    }

    next();
  };
};

export default validateMongoDBId;
