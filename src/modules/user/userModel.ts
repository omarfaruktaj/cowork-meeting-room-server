import mongoose, { Schema } from "mongoose";
import { TUser } from "./userValidation";
import isEmail from "validator/lib/isEmail";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: "Invalid email address",
    },
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone"],
    trim: true,
    validate: {
      validator: (value: string) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value),
      message: "Invalid phone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [50, "Password can't be more then 50 characters long"],
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
