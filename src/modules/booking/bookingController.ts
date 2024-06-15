import { Request, Response } from "express";
import { createBookingService } from "./bookingService";
import httpStatus from "http-status";
import APIResponse from "../../utils/APIresponse";

export const createBookingController = async (req: Request, res: Response) => {
  const userId = req.body.user ? req.body.user : req?.user?._id;

  const booking = await createBookingService({ ...req.body, userId });

  res
    .status(httpStatus.CREATED)
    .json(
      new APIResponse(
        true,
        httpStatus.CREATED,
        "Booking created successfully",
        booking,
      ),
    );
};
