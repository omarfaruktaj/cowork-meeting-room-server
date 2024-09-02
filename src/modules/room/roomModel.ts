import { Schema, model } from "mongoose";
import { TRoom } from "./roomValidation";

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Room name is required"],
      minlength: [2, "Room name must be at least 2 characters long"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must be at most 500 characters long"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    roomNo: {
      type: Number,
      required: [true, "RoomNO  is required"],
      unique: true,
      min: [1, "Room name must be at least 2 characters long"],
    },
    floorNo: {
      type: Number,
      required: [true, "FloorNo  is required"],
      min: [0, "Floor number must be a non-negative integer"],
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be a positive integer"],
    },
    pricePerSlot: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price per slot must be a positive number"],
    },
    amenities: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

roomSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Room = model<TRoom>("Room", roomSchema);

export default Room;
