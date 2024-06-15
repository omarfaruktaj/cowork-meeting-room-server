import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import {
  createBookingController,
  deleteBookingController,
  getAllBookingsController,
  updateBookingController,
} from "./bookingController";

const router = express.Router();

router
  .route("/")
  .post(authorizeWithRoles("admin", "user"), createBookingController)
  .get(authorizeWithRoles("admin"), getAllBookingsController);

router.use(authorizeWithRoles("admin"));

router
  .route("/:id")
  .put(updateBookingController)
  .delete(deleteBookingController);
export default router;
