import { RequestHandler } from "express";
import {
  GetAvailableSlotService,
  GetSlotsService,
  createSlotService,
  deleteSlotService,
  updateSlotService,
} from "./slotService";
import httpStatus from "http-status";
import APIResponse from "../../utils/APIresponse";
import { validateSlotQueryParams } from "./slotValidation";

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

export const updateSlotController: RequestHandler = async (req, res) => {
  const slotId = req.params.slotId;
  const slot = await updateSlotService(slotId, req.body);
  res
    .status(httpStatus.CREATED)
    .json(
      new APIResponse(
        true,
        httpStatus.CREATED,
        "Slots updated successfully",
        slot,
      ),
    );
};

export const deleteSlotController: RequestHandler = async (req, res) => {
  const slotId = req.params.slotId;
  const slot = await deleteSlotService(slotId);
  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(true, httpStatus.OK, "Slots delete successfully", slot),
    );
};

export const GetAvailableSlotController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const result = validateSlotQueryParams.safeParse(req.query);

  if (!result.success) return next(result.error);

  const slots = await GetAvailableSlotService(result.data);

  if (!slots.length)
    return res
      .status(httpStatus.NOT_FOUND)
      .json(new APIResponse(false, httpStatus.NOT_FOUND, "No Data Found", []));

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "Available slots retrieved successfully",
        slots,
      ),
    );
};
export const GetSlotsController: RequestHandler = async (req, res) => {
  const slots = await GetSlotsService();

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "Available slots retrieved successfully",
        slots,
      ),
    );
};
