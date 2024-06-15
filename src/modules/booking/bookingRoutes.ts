import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import { createBookingController } from "./bookingController";

const router = express.Router();

router
  .route("/")
  .post(authorizeWithRoles("admin", "user"), createBookingController);

export default router;
