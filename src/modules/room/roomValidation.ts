import { z } from "zod";

export const roomValidationSchema = z.object({
  name: z
    .string({ required_error: "Room name is required" })
    .min(2, { message: "Room name must be at least 2 characters long" }),
  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long" })
    .optional(),
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
  images: z
    .array(z.string(), { required_error: "At least one image URL is required" })
    .nonempty({ message: "At least one image URL is required" }),
  isDeleted: z.boolean().optional(),
});

export const updateRoomValidationSchema = z.object({
  name: z
    .string({ required_error: "Room name is required" })
    .min(2, { message: "Room name must be at least 2 characters long" })
    .optional(),
  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long" })
    .optional(),
  roomNo: z
    .number({ required_error: "RoomNo is required" })
    .min(1, { message: "Room number must be at least 1 character long" })
    .optional(),
  floorNo: z
    .number({ required_error: "floorNo is required" })
    .int()
    .min(0, { message: "Floor number must be a non-negative integer" })
    .optional(),
  capacity: z
    .number({ required_error: "capacity is required" })
    .min(1, { message: "Capacity must be a positive integer" })
    .optional(),
  pricePerSlot: z
    .number({ required_error: "pricePerSlot is required" })
    .positive({ message: "Price per slot must be a positive number" })
    .optional(),
  amenities: z.array(z.string()).optional(),
  images: z
    .array(z.string(), { required_error: "At least one image URL is required" })
    .nonempty({ message: "At least one image URL is required" })
    .optional(),
  isDeleted: z.boolean().optional(),
});

export type TRoom = z.infer<typeof roomValidationSchema>;
export type TUpdateRoom = z.infer<typeof updateRoomValidationSchema>;
