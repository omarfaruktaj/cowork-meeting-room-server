import express from "express";
import userRoutes from "../modules/user/userRoute";
import roomRotes from "../modules/room/roomRoutes";
import slotRotes from "../modules/slot/slotRoutes";
import bookingRotes from "../modules/booking/bookingRoutes";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/rooms", roomRotes);
router.use("/slots", slotRotes);
router.use("/bookings", bookingRotes);

export default router;
