import { Schema, model } from "mongoose";
import { TBooking } from "./bookingValidation";

const bookingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    min: [0, "Total amount must be a non-negative number"],
    required: true,
  },
  isConfirmed: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
    default: "unconfirmed",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Booking = model<TBooking>("Booking", bookingSchema);

export default Booking;
