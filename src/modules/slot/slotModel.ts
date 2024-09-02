import { Schema, model } from "mongoose";
import { TSlot } from "./slotValidation";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  startTime: {
    type: String,
    required: [true, "startTime is required"],
  },
  endTime: {
    type: String,
    required: [true, "EndTime is required"],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Slot = model<TSlot>("Slot", slotSchema);

export default Slot;
