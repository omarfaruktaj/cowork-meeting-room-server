import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import validateRequest from "../../middlewares/validateRequest";
import { slotValidationSchema } from "./slotValidation";
import {
  GetAvailableSlotController,
  createSlotController,
} from "./slotController";

const router = express.Router();

router.get("/availability", GetAvailableSlotController);

router
  .route("/")
  .post(
    authorizeWithRoles("admin"),
    validateRequest(slotValidationSchema),
    createSlotController,
  );

export default router;
