import express from "express";
import userRoutes from "../modules/user/userRoute";
import roomRotes from "../modules/room/roomRoutes";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/", roomRotes);

export default router;
