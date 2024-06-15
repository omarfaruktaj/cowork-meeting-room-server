import express from "express";
import { getUserBookingsController } from "./bookingController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";

const router = express.Router();

router.get("/", authorizeWithRoles("user", "admin"), getUserBookingsController);

export default router;
