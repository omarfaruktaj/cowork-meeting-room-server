import { RequestHandler } from "express";
import { loginService, signupService } from "./userService";
import APIResponse from "../../utils/APIresponse";
import httpStatus from "http-status";
import generateJWT from "../../utils/generateJWT";
import envConfig from "../../config/env";

export const signupController: RequestHandler = async (req, res) => {
  const user = await signupService(req.body);

  res
    .status(httpStatus.CREATED)
    .json(
      new APIResponse(
        true,
        httpStatus.CREATED,
        "User registered successfully",
        user,
      ),
    );
};

export const loginController: RequestHandler = async (req, res) => {
  const user = await loginService(req.body);

  const token = generateJWT(
    { userId: String(user._id), role: user.role },
    envConfig.get("ACCESS_TOKEN_SECRET"),
    envConfig.get("ACCESS_TOKEN_EXPIRE_IN"),
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: token,
    data: user,
  });
};
