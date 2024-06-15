import { Request, Response } from "express";
import {
  createBookingService,
  deleteBookingService,
  getAllBookingsService,
  getUserBookingsService,
  updateBookingService,
} from "./bookingService";
import httpStatus from "http-status";
import APIResponse from "../../utils/APIresponse";

export const createBookingController = async (req: Request, res: Response) => {
  const userId = req.body.user ? req.body.user : req?.user?._id;

  const booking = await createBookingService({ ...req.body, userId });

  res
    .status(
      // httpStatus.CREATED,
      httpStatus.OK,
    )
    .json(
      new APIResponse(
        true,
        // httpStatus.CREATED,
        httpStatus.OK,
        "Booking created successfully",
        booking,
      ),
    );
};

export const getAllBookingsController = async (req: Request, res: Response) => {
  const bookings = await getAllBookingsService();

  if (!bookings.length)
    return res
      .status(httpStatus.NOT_FOUND)
      .json(new APIResponse(false, httpStatus.NOT_FOUND, "No Data Found", []));

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

  if (!bookings.length)
    return res
      .status(httpStatus.NOT_FOUND)
      .json(new APIResponse(false, httpStatus.NOT_FOUND, "No Data Found", []));

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

export const updateBookingController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const booking = await updateBookingService(id, req.body);

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "Booking updated successfully",
        booking,
      ),
    );
};

export const deleteBookingController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const booking = await deleteBookingService(id);

  res
    .status(httpStatus.OK)
    .json(
      new APIResponse(
        true,
        httpStatus.OK,
        "Booking deleted successfully",
        booking,
      ),
    );
};
