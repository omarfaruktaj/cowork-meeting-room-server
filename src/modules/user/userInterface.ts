import { Model } from "mongoose";
import { TUser } from "./userValidation";
import { USER_ROLE } from "./userConstant";

export interface UserModel extends Model<TUser> {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
