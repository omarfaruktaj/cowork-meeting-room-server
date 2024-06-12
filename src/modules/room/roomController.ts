import { RequestHandler } from "express";
import {
  createRoomService,
  getARoomService,
  getAllRoomService,
} from "./roomService";
import httpStatus from "http-status";
import APIResponse from "../../utils/APIresponse";

export const createRoomController: RequestHandler = async (req, res) => {
  const room = await createRoomService(req.body);

  res
    .status(httpStatus.CREATED)
    .json(
      new APIResponse(
        true,
        httpStatus.CREATED,
        "Room added successfully",
        room,
      ),
    );
};
export const getARoomController: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const room = await getARoomService(id);

  if (!room) {
    res
      .status(httpStatus.NOT_FOUND)
      .json(new APIResponse(false, httpStatus.NOT_FOUND, "No Data Found", []));
  }

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(true, httpStatus.OK, "room retrieved successfully", room),
    );
};
export const getAllRoomController: RequestHandler = async (req, res) => {
  const rooms = await getAllRoomService();

  if (!rooms.length) {
    res
      .status(httpStatus.NOT_FOUND)
      .json(new APIResponse(false, httpStatus.NOT_FOUND, "No Data Found", []));
  }

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "Rooms retrieved successfully",
        rooms,
      ),
    );
};
