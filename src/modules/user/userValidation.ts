import { z } from "zod";

const userRoleEnum = z.enum(["user", "admin"]);

const userValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, {
      message: "Password can't be more then 50 characters long",
    }),
  phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
    message: "Invalid phone number",
  }),
  address: z.string(),
  role: userRoleEnum,
});

export type TUser = z.infer<typeof userValidationSchema>;

export default userValidationSchema;
