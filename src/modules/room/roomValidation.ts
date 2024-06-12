import { z } from "zod";

export const roomValidationSchema = z.object({
  name: z
    .string({ required_error: "Room name is required" })
    .min(2, { message: "Room name must be at least 2 characters long" }),
  roomNo: z
    .number({ required_error: "RoomNo is required" })
    .min(1, { message: "Room number must be at least 1 character long" }),
  floorNo: z
    .number({ required_error: "floorNo is required" })
    .int()
    .min(0, { message: "Floor number must be a non-negative integer" }),
  capacity: z
    .number({ required_error: "capacity is required" })
    .min(1, { message: "Capacity must be a positive integer" }),
  pricePerSlot: z
    .number({ required_error: "pricePerSlot is required" })
    .positive({ message: "Price per slot must be a positive number" }),
  amenities: z.array(z.string()),
  isDeleted: z.boolean().optional(),
});

export type TRoom = z.infer<typeof roomValidationSchema>;
