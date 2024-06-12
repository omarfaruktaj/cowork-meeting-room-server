import mongoose, { Schema } from "mongoose";
import { TUser } from "./userValidation";
import isEmail from "validator/lib/isEmail";
import { UserModel } from "./userInterface";
import bcrypt from "bcrypt";
import makeFieldsPrivatePlugin from "../../utils/makeFieldsPrivate";

const userSchema = new Schema<TUser, UserModel>({
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
      validator: (value: string) => /^\+?[0-9][0-9- ]{6,14}[0-9]$/.test(value),
      message: "Invalid phone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [50, "Password can't be more then 50 characters long"],
    select: false,
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

userSchema.plugin(makeFieldsPrivatePlugin, ["password"]);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<TUser, UserModel>("User", userSchema);

export default User;
