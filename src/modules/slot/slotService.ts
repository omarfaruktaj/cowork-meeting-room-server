import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import { getARoomService } from "../room/roomService";
import { TSlot } from "./slotValidation";
import Slot from "./slotModel";

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

  if (!room) throw new AppError("No room found.", httpStatus.NOT_FOUND);

  const slotDuration = 60;

  const startTimeInMinute = getTimeInMinutes(data.startTime);
  const endTimeInMinute = getTimeInMinutes(data.endTime);

  const totalDuration = endTimeInMinute - startTimeInMinute;

  const numberOfSlots = Math.floor(totalDuration / slotDuration);

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
