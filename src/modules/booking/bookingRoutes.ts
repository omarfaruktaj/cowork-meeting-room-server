import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import {
  createBookingController,
  getAllBookingsController,
} from "./bookingController";

const router = express.Router();

router
  .route("/")
  .post(authorizeWithRoles("admin", "user"), createBookingController)
  .get(authorizeWithRoles("admin"), getAllBookingsController);

export default router;
