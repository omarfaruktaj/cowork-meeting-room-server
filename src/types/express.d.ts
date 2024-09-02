type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
};
declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}
