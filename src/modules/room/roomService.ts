import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import Room from "./roomModel";
import { TRoom, TUpdateRoom } from "./roomValidation";
import ApiFeatures from "../../builder/api-feature";

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

interface Pagination {
  page: number;
  totalPage: number;
  limit: number;
  next?: number;
  prev?: number;
  totalRooms: number;
}
export interface QueryString {
  searchTerm?: string;
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const getAllRoomService = async (query: QueryString) => {
  const features = new ApiFeatures<TRoom>(
    Room.find({ isDeleted: false }),
    query,
  ).apply(["name"]);

  const roomCount = new ApiFeatures<TRoom>(
    Room.find({ isDeleted: false }),
    query,
  )
    .search(["name"])
    .filter();

  const totalRooms = await roomCount.query.countDocuments();

  const totalPage = Math.ceil(totalRooms / (Number(query.limit) || 10));
  const pagination: Pagination = {
    totalPage,
    totalRooms,
    limit: Number(query.limit) || 10,

    page: Number(query.page) || 1,
  };
  if ((Number(query.page) || 1) < totalPage) {
    pagination.next = (Number(query.page) || 1) + 1;
  }

  if ((Number(query.page) || 1) > 1) {
    pagination.prev = Number(query.page) - 1;
  }
  const rooms = await features;

  return {
    rooms,
    pagination,
  };
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
