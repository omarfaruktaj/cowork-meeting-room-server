import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import { getARoomService } from "../room/roomService";
import { TSlot, TSlotQueryParams } from "./slotValidation";
import Slot from "./slotModel";
import { Types } from "mongoose";

function getTimeInMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function getTimeFromMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export const createSlotService = async (data: TSlot) => {
  const roomId = data.room.toString();

  const room = await getARoomService(roomId);

  if (!room || room.isDeleted)
    throw new AppError("No room found.", httpStatus.NOT_FOUND);

  const slotDuration = 60;

  const startTimeInMinute = getTimeInMinutes(data.startTime);
  const endTimeInMinute = getTimeInMinutes(data.endTime);

  const totalDuration = endTimeInMinute - startTimeInMinute;

  const numberOfSlots = Math.floor(totalDuration / slotDuration);

  const existingSlots = await Slot.find({
    room: data.room,
    date: data.date,
  });

  // Check for overlaps with existing slots
  for (const existingSlot of existingSlots) {
    const existingStartTimeInMinute = getTimeInMinutes(existingSlot.startTime);
    const existingEndTimeInMinute = getTimeInMinutes(existingSlot.endTime);

    const isOverlap = !(
      existingEndTimeInMinute <= startTimeInMinute ||
      existingStartTimeInMinute >= endTimeInMinute
    );

    if (isOverlap) {
      throw new AppError(
        "Slot already exists in the given time range.",
        httpStatus.CONFLICT,
      );
    }
  }

  const slots = [];

  for (let i = 0; i < numberOfSlots; i++) {
    slots.push({
      room: data.room,
      date: data.date,
      startTime: getTimeFromMinutes(startTimeInMinute + slotDuration * i),
      endTime: getTimeFromMinutes(startTimeInMinute + slotDuration * (i + 1)),
    });
  }
  const newSlots = await Slot.insertMany(slots);

  return newSlots;
};

export const updateSlotService = async (id: string, data: TSlot) => {
  const roomId = data.room.toString();

  // Fetch the room and validate it
  const room = await getARoomService(roomId);
  if (!room || room.isDeleted) {
    throw new AppError("No room found.", httpStatus.NOT_FOUND);
  }

  // Fetch the slot to update and validate it
  const slot = await Slot.findById(id);
  if (!slot) {
    throw new AppError("No slot found.", httpStatus.NOT_FOUND);
  }

  // Extract new slot times
  const startTimeInMinute = getTimeInMinutes(data.startTime);
  const endTimeInMinute = getTimeInMinutes(data.endTime);

  // Fetch all existing slots for the same room and date
  const existingSlots = await Slot.find({
    room: data.room,
    date: data.date,
  });

  // Check for overlaps with existing slots (excluding the slot being updated itself)
  for (const existingSlot of existingSlots) {
    if (existingSlot._id.toString() === id) continue; // Skip the slot being updated

    const existingStartTimeInMinute = getTimeInMinutes(existingSlot.startTime);
    const existingEndTimeInMinute = getTimeInMinutes(existingSlot.endTime);

    // Check if there is an overlap
    const isOverlap = !(
      existingEndTimeInMinute <= startTimeInMinute ||
      existingStartTimeInMinute >= endTimeInMinute
    );

    if (isOverlap) {
      throw new AppError(
        "Slot already exists in the given time range.",
        httpStatus.CONFLICT,
      );
    }
  }

  const updatedSlot = await Slot.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updatedSlot;
};

export const deleteSlotService = async (id: string) => {
  const slot = await Slot.findById(id);

  if (!slot) throw new AppError("No slot found.", httpStatus.NOT_FOUND);

  const deletedSlot = await Slot.findByIdAndDelete(id);

  return deletedSlot;
};

interface QueryInterface {
  isBooked: boolean;
  date?: string;
  room?: Types.ObjectId;
}

export const GetAvailableSlotService = async (params: TSlotQueryParams) => {
  const query: QueryInterface = {
    isBooked: false,
  };

  if (params.date) {
    query.date = params.date;
  }
  if (params.roomId) {
    query.room = params.roomId;
  }

  const slots = await Slot.find(query).populate("room");
  return slots;
};
export const GetSlotsService = async () => {
  const slots = await Slot.find().populate("room");
  return slots;
};
