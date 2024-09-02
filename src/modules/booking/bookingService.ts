import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import { getARoomService } from "../room/roomService";
import { TBooking, TUpdateBooking } from "./bookingValidation";
import Slot from "../slot/slotModel";
import Booking from "./bookingModel";
import { getUserById } from "../user/userService";

export const createBookingService = async (data: TBooking) => {
  const { date, room, slots, user } = data;

  const isUserExist = await getUserById(String(user));

  if (!isUserExist) throw new AppError("No user found", httpStatus.NOT_FOUND);

  const isRoomExist = await getARoomService(String(room));

  if (!isRoomExist) {
    throw new AppError("No room found", httpStatus.NOT_FOUND);
  }

  const isAvailableSlots = await Slot.find({
    date: date,
    _id: { $in: slots },
    isBooked: { $ne: true },
  });

  if (isAvailableSlots.length !== slots.length) {
    throw new AppError(
      "Some slots are not available at this time.",
      httpStatus.CONFLICT,
    );
  }

  // Mark slots as booked
  await Slot.updateMany(
    {
      _id: {
        $in: slots,
      },
    },
    { $set: { isBooked: true } },
  );

  const totalAmount = isRoomExist.pricePerSlot * slots.length;

  // Create the booking
  const newBooking = await Booking.create({
    date,
    room,
    slots,
    totalAmount,
    user,
  });

  await newBooking.populate(["slots", "room", "user"]);

  return newBooking;
};

export const getAllBookingsService = async () => {
  const bookings = await Booking.find({}).populate(["slots", "room", "user"]);

  return bookings;
};

export const getUserBookingsService = async (userId: string) => {
  const bookings = await Booking.find({ user: userId }).populate([
    "slots",
    "room",
  ]);

  return bookings;
};

export const updateBookingService = async (
  id: string,
  data: TUpdateBooking,
) => {
  const isBookingExist = await Booking.findById(id);

  if (!isBookingExist)
    throw new AppError("No booking found", httpStatus.NOT_FOUND);
  const booking = await Booking.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return booking;
};

export const deleteBookingService = async (id: string) => {
  const isBookingExist = await Booking.findById(id);

  if (!isBookingExist)
    throw new AppError("No booking found", httpStatus.NOT_FOUND);

  const booking = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return booking;
};
