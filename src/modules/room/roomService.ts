import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import Room from "./roomModel";
import { TRoom, TUpdateRoom } from "./roomValidation";

export const createRoomService = async (data: TRoom) => {
  const existedRoom = await Room.findOne({ roomNo: data.roomNo });

  if (existedRoom)
    throw new AppError("This room already exist", httpStatus.CONFLICT);

  const newRoom = new Room(data);

  await newRoom.save();

  return newRoom;
};

export const updateRoomService = async (roomId: string, data: TUpdateRoom) => {
  const room = await Room.findById(roomId);

  if (!room) throw new AppError("No room found", httpStatus.NOT_FOUND);

  const updatedRoom = await Room.findByIdAndUpdate(room.id, data, {
    new: true,
    runValidators: true,
  });

  return updatedRoom;
};

export const getARoomService = (roomId: string) => {
  return Room.findById(roomId);
};

export const getAllRoomService = () => {
  return Room.find({});
};

export const deleteRoomService = async (roomId: string) => {
  const room = await Room.findById(roomId);

  if (!room) throw new AppError("No room found", httpStatus.NOT_FOUND);
  const deletedRoom = await Room.findByIdAndUpdate(
    roomId,
    { isDeleted: true },
    { new: true },
  );

  return deletedRoom;
};
