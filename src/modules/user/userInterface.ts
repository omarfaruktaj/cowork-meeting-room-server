import { Model } from "mongoose";
import { TUser } from "./userValidation";

export interface UserModel extends Model<TUser> {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
}
