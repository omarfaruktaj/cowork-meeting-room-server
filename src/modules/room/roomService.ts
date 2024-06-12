import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import Room from "./roomModel";
import { TRoom } from "./roomValidation";

export const createRoomService = async (data: TRoom) => {
  const existedRoom = await Room.findOne({ roomNo: data.roomNo });

  if (existedRoom)
    throw new AppError("This room already exist", httpStatus.CONFLICT);

  const newRoom = new Room(data);

  await newRoom.save();

  return newRoom;
};

export const getARoomService = (roomId: string) => {
  return Room.findById(roomId);
};
