import express from "express";
import userRoutes from "../modules/user/userRoute";

const router = express.Router();

router.use("/auth", userRoutes);

export default router;
