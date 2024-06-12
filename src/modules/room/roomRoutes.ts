import express from "express";
import { createRoomController } from "./roomController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import { USER_ROLE } from "../user/userConstant";
import { roomValidationSchema } from "./roomValidation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router
  .route("/rooms")
  .post(
    authorizeWithRoles(USER_ROLE.admin),
    validateRequest(roomValidationSchema),
    createRoomController,
  );

export default router;
