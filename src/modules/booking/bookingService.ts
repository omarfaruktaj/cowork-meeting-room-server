import httpStatus from "http-status";
import AppError from "../../utils/app-error";
import { getARoomService } from "../room/roomService";
import { TBooking } from "./bookingValidation";
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

  console.log(isAvailableSlots);

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
