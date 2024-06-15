import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import {
  createBookingController,
  getAllBookingsController,
  updateBookingController,
} from "./bookingController";

const router = express.Router();

router
  .route("/")
  .post(authorizeWithRoles("admin", "user"), createBookingController)
  .get(authorizeWithRoles("admin"), getAllBookingsController);

router.route("/:id").put(authorizeWithRoles("admin"), updateBookingController);
export default router;
