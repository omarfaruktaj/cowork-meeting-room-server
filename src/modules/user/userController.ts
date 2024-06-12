import { RequestHandler } from "express";
import { signupService } from "./userService";
import APIResponse from "../../utils/APIresponse";
import httpStatus from "http-status";

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
