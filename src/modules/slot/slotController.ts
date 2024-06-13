import { RequestHandler } from "express";
import { createSlotService } from "./slotService";
import httpStatus from "http-status";
import APIResponse from "../../utils/APIresponse";

export const createSlotController: RequestHandler = async (req, res) => {
  const slots = await createSlotService(req.body);
  res
    .status(httpStatus.CREATED)
    .json(
      new APIResponse(
        true,
        httpStatus.CREATED,
        "Slots created successfully",
        slots,
      ),
    );
};
