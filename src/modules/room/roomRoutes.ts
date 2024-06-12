import express from "express";
import {
  createRoomController,
  deleteRoomController,
  getARoomController,
  getAllRoomController,
  updateRoomController,
} from "./roomController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import { USER_ROLE } from "../user/userConstant";
import {
  roomValidationSchema,
  updateRoomValidationSchema,
} from "./roomValidation";
import validateRequest from "../../middlewares/validateRequest";
import validateMongoDBId from "../../middlewares/validateMongoId";

const router = express.Router();

router
  .route("/rooms")
  .post(
    authorizeWithRoles(USER_ROLE.admin),
    validateRequest(roomValidationSchema),
    createRoomController,
  )
  .get(getAllRoomController);

router
  .route("/rooms/:id")
  .get(validateMongoDBId("id"), getARoomController)
  .put(
    authorizeWithRoles(USER_ROLE.admin),
    validateMongoDBId("id"),
    validateRequest(updateRoomValidationSchema),
    updateRoomController,
  )
  .delete(
    authorizeWithRoles(USER_ROLE.admin),
    validateMongoDBId("id"),
    validateRequest(updateRoomValidationSchema),
    deleteRoomController,
  );

export default router;
