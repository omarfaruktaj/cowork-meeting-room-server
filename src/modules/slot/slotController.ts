import { RequestHandler } from "express";
import { GetAvailableSlotService, createSlotService } from "./slotService";
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
