import { Request, Response } from "express";
import {
  createBookingService,
  getAllBookingsService,
  getUserBookingsService,
} from "./bookingService";
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
export const getAllBookingsController = async (req: Request, res: Response) => {
  const bookings = await getAllBookingsService();

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "All bookings retrieved successfully",
        bookings,
      ),
    );
};
export const getUserBookingsController = async (
  req: Request,
  res: Response,
) => {
  const bookings = await getUserBookingsService(String(req.user?._id));

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "User bookings retrieved successfully",
        bookings,
      ),
    );
};
