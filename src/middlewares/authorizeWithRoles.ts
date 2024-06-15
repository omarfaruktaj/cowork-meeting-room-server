import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app-error";
import httpStatus from "http-status";
import envConfig from "../config/env";
import { getUserById } from "../modules/user/userService";
import { TUserRole } from "../modules/user/userInterface";

const authorizeWithRoles =
  (...roles: TUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token)
      return next(
        new AppError(
          "Your are not logged in! Please login.",
          httpStatus.UNAUTHORIZED,
        ),
      );

    const decoded = jwt.verify(
      token,
      envConfig.get("ACCESS_TOKEN_SECRET"),
    ) as JwtPayload;
    const user = await getUserById(decoded.userId);

    if (!user) return next(new AppError("No user found", httpStatus.NOT_FOUND));

    if (roles && !roles.includes(user.role))
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    // return next(
    //   new AppError(
    //     "You do not have permission for this route",
    //     httpStatus.UNAUTHORIZED,
    //   ),
    // );

    req.user = user;
    next();
  };

export default authorizeWithRoles;
