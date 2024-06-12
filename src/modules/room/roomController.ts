import { RequestHandler } from "express";
import { createRoomService } from "./roomService";
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
