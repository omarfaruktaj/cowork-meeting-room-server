import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import User from "./userModel";
import { TUser } from "./userValidation";

export const signupService = async (data: TUser) => {
  // Find if user with the provided email already exists
  const existingUser = await User.findOne({ email: data.email });

  // check is user exist
  if (existingUser)
    throw new AppError("User already exist.", httpStatus.CONFLICT);

  const newUse = new User(data);
  await newUse.save();

  return newUse;
};
