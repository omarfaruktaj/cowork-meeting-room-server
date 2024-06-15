import { Types } from "mongoose";
import { z } from "zod";
const objectIdSchema = z
  .string()
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid id",
  })
  .transform((id) => new Types.ObjectId(id));

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Invalid date format, must be YYYY-MM-DD",
});

export const bookingValidationSchema = z.object({
  room: objectIdSchema,
  slots: z.array(objectIdSchema),
  user: objectIdSchema.optional(),
  date: dateSchema,
  totalAmount: z
    .number()
    .min(0, { message: "Total amount must be a non-negative number" }),
  isConfirmed: z
    .enum(["confirmed", "unconfirmed", "canceled"], {
      message:
        "Booking status must be one of 'confirmed', 'unconfirmed', or 'canceled'",
    })
    .default("unconfirmed"),
  isDeleted: z.boolean().optional(),
});

export type TBooking = z.infer<typeof bookingValidationSchema>;
