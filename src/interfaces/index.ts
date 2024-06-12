import { TUser } from "../modules/user/userValidation";

declare module "express" {
  interface Request {
    user?: TUser;
  }
}
