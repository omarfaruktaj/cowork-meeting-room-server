import express from "express";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import validateRequest from "../../middlewares/validateRequest";
import { slotValidationSchema } from "./slotValidation";
import {
  GetAvailableSlotController,
  GetSlotsController,
  createSlotController,
  deleteSlotController,
  updateSlotController,
} from "./slotController";

const router = express.Router();

router.get("/availability", GetAvailableSlotController);
router.use(authorizeWithRoles("admin"));

router
  .route("/")
  .get(GetSlotsController)
  .post(validateRequest(slotValidationSchema), createSlotController);
router
  .route("/:slotId")
  .put(validateRequest(slotValidationSchema), updateSlotController)
  .delete(deleteSlotController);

export default router;
