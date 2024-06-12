import express from "express";
import { createRoomController, getARoomController } from "./roomController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import { USER_ROLE } from "../user/userConstant";
import { roomValidationSchema } from "./roomValidation";
import validateRequest from "../../middlewares/validateRequest";
import validateParam from "../../middlewares/validateMongoId";

const router = express.Router();

router
  .route("/rooms")
  .post(
    authorizeWithRoles(USER_ROLE.admin),
    validateRequest(roomValidationSchema),
    createRoomController,
  );

router.route("/rooms/:id").get(validateParam("id"), getARoomController);

export default router;
