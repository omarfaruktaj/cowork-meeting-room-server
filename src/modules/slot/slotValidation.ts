import { Types } from "mongoose";
import { z } from "zod";

const objectIdSchema = z
  .instanceof(Types.ObjectId)
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid room id",
  });

// Date validation (YYYY-MM-DD format)
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date format, must be YYYY-MM-DD",
  })
  .transform((str) => new Date(str))
  .refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  });

// Time validation (HH:mm format)
const timeSchema = z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
  message: "Invalid time format, must be HH:mm",
});

export const slotValidationSchema = z
  .object({
    room: objectIdSchema,
    date: dateSchema,
    startTime: timeSchema,
    endTime: timeSchema,
    isBooked: z.boolean().default(false),
  })
  .refine(
    ({ startTime, endTime }) => {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);

      return start < end;
    },
    {
      message: "End time must be after start time",
    },
  );

export type TSlot = z.infer<typeof slotValidationSchema>;
